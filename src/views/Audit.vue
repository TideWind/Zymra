<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { Headset } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async() =>{
  getRole()
  getPendingMusics()
  getRefusedMusics()
})

const pending_musics = ref([]);
const refused_musics = ref([]);
const refused_reasons = ref([]);

const isPendingMusicsLoad = ref(false)
const isRefusedMusicsLoad = ref(false)

const { proxy } = getCurrentInstance()

let getRole = async () => {
  let res = await proxy.$api.getRole()
  if (res.status == 200) {
    if(!res.data.includes('admin'))
      router.push('/NotFound')
  }
  else
  {
    router.push('/NotFound')
  }
}

let getPendingMusics = async () => {
  let res = await proxy.$api.getPendingMusics()
  //console.log(res)
  if (res.status == 200) {
    pending_musics.value = res.data;
    refused_reasons.value = []
    isPendingMusicsLoad.value = true
    //console.log(pending_musics.value)
  }
}

let getRefusedMusics = async () => {
  let res = await proxy.$api.getRefusedMusics()
  //console.log(res)
  if (res.status == 200) {
    refused_musics.value = res.data
    isRefusedMusicsLoad.value = true
    //console.log(refused_musics.value)
  }
}

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':');
  return `${minutes}:${seconds}`
}

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}

const activeTab = ref('pending')

const approveClick = (music_id) => {
  approveMusic(music_id)
}

const refuseClick = (music_id, reason) => {
  refuseMusic(music_id, reason)
}

let approveMusic = async (music_id) => {
  let res = await proxy.$api.approveMusic(music_id)
  //console.log(res)
  if (res.status == 200) {
    getPendingMusics()
    //console.log(res)
  }
}

let refuseMusic = async (music_id, reason) => {
  let res = await proxy.$api.refuseMusic({music_id: music_id, refuse_reason: reason})
  //console.log(res)
  if (res.status == 200) {
    getPendingMusics()
    getRefusedMusics()
    //console.log(res)
  }
}

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px; min-height:700px">

      <el-tabs v-model="activeTab" style="margin-left:20px;--el-text-color-primary:#888; --el-color-primary:#FFA500;--el-border-color-light:transparent; width:946px">
            <el-tab-pane label="待审核" name="pending">


              <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>

    <el-skeleton style="width: 946px; margin-top:20px" :loading="!isPendingMusicsLoad" :throttle="500" animated :count="3">
      <template #template>
        <div style="padding: 20px; margin-left: -20px">
          <el-skeleton-item variant="h3" style="margin-left:14px; width: 30%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-left:14px;
              margin-top: 20px;
              height: 16px;
              margin-bottom:10px"
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
          </div>
        </div>
      </template>
      <template #default>
              <p v-if="pending_musics.length == 0 && isPendingMusicsLoad" style="text-align:center; color:#888; margin-top:30px;">目前没有正在审核中的音乐哦</p>
                  <div v-for="(item, index) in pending_musics" :key="index">
                    <div v-if="item.status == 0">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:1000px;margin-left:20px; margin-right:0px; height:160px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:0px;">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:120px; height: 120px;  border: 1px solid transparent;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/music/' + item.musicId">
                            <p style="margin-left: 0px; font-size: 16px;">{{ item.name }}</p>
                          </router-link>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.album }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:34px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <p style="position: relative;z-index:10; margin-left:-77px; margin-top:-32px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>


                        <el-button @click="approveClick(item.musicId)" style="margin-top:100px; margin-left:376px; width:80px; --el-color-primary:green" plain>通过</el-button>
                        <el-popover
                          width="220px"
                        >
                          <template #reference>
                            <el-button style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:red" plain>拒绝</el-button>
                          </template>
                          <el-input v-model="refused_reasons[index]" style="width: 194px; margin-top:10px; --el-color-primary:#FFA500;" placeholder="请输入拒绝理由" clearable/>
                          <el-button @click="refuseClick(item.musicId, refused_reasons[index])" style="width:60px; height:30px; margin-top:10px; margin-left:134px; margin-bottom:5px; font-size:12px; --el-color-primary:#FFA500" plain>提交</el-button>
                        </el-popover>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>
            </div>
      </template>
    </el-skeleton>

              <div style="margin-bottom:40px" />


            </el-tab-pane>
              <el-tab-pane label="已拒绝" name="approved">


                <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>

    <el-skeleton style="width: 946px; margin-top:20px" :loading="!isRefusedMusicsLoad" :throttle="500" animated :count="3">
      <template #template>
        <div style="padding: 20px; margin-left: -20px">
          <el-skeleton-item variant="h3" style="margin-left:14px; width: 30%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-left:14px;
              margin-top: 20px;
              height: 16px;
              margin-bottom:10px"
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
          </div>
        </div>
      </template>
      <template #default>
              <p v-if="refused_musics.length == 0 && isRefusedMusicsLoad" style="text-align:center; color:#888; margin-top:30px;">目前没有已拒绝的音乐哦</p>
                  <div v-for="(item, index) in refused_musics" :key="index">
                    <div v-if="item.status == 0">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:1000px;margin-left:20px; margin-right:0px; height:160px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:0px;">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:120px; height: 120px;  border: 1px solid transparent;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/music/' + item.musicId">
                            <p style="margin-left: 0px; font-size: 16px;">{{ item.name }}</p>
                          </router-link>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.album }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:34px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <p style="position: relative;z-index:10; margin-left:-77px; margin-top:-32px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>

                        <p style="margin-top:100px; margin-left:320px; width:80px; color:red; font-size:14px" plain>原因：{{ item.musicRefusedReasons[0].reason }}</p>
                        
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>
            </div>
      </template>
    </el-skeleton>

              <div style="margin-bottom:40px" />

              </el-tab-pane>
      </el-tabs>

    </el-card>
  </el-container>
</template>

<style scoped>
.header{
  padding: 0em;
}
.main{
  padding: 0em;
}
.footer{
  padding: 0em;
}
.card{
  background-color: #ffffff;
  display: flex;
  justify-content: center;
}
.background{
  background-color: rgb(245,245,245);
}
.container_align {
  display: flex;
  align-items: center; /* 垂直居中 */
}
.container_justify {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.router-link-active {
  text-decoration: none;
  color: black;
}
a{
  text-decoration: none;
  color: black;
}
a:hover {
  color: #ea9800;
}
</style>

<style>
  .el-popconfirm__action {
  .el-button:nth-child(2) {
    --el-button-bg-color: rgb(255, 246, 230);
    --el-button-text-color: #FFA500;
    --el-button-border-color: rgb(255, 210, 128);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-bg-color: #FFA500;
    --el-button-hover-border-color: #FFA500;
    --el-button-active-bg-color: rgb(208, 136, 4);
    --el-button-active-text-color: var(--el-color-white);
    --el-button-active-border-color: rgb(208, 136, 4);
  }
}
  </style>