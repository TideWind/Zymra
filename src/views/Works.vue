<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { Headset } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

onMounted(() =>{
  getSelfMusics()
})

const musics = ref([]);

const { proxy } = getCurrentInstance()

let getSelfMusics = async () => {
  let res = await proxy.$api.getSelfMusics()
  if (res.status == 200) {
    musics.value = res.data;
    //console.log(musics.value)
  }
}

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':');
  return `${minutes}:${seconds}`;
}

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

const activeTab = ref('all')

const confirmDelete = (music_id) =>
{
  deleteMusic(music_id)
}

let deleteMusic = async (music_id) => {
  let res = await proxy.$api.deleteMusic(music_id)
  //console.log(res)
  if (res.status == 200) {
    ElMessage({ message: '稿件删除成功！', type: 'success' });
    getSelfMusics()
  }
}

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px; min-height:700px">

      <el-tabs v-model="activeTab" style="margin-left:20px;--el-text-color-primary:#888; --el-color-primary:#FFA500;--el-border-color-light:transparent; width:946px">
          <el-tab-pane label="全部稿件" name="all">


            <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>
            <p v-if="musics.length == 0" style="text-align:center; color:#888; margin-top:30px;">目前没有投稿的音乐哦</p>
                  <div v-for="(item, index) in musics" :key="index">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:1000px;margin-left:20px; margin-right:0px; height:160px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:0px;">
                          <el-image :src="'/api/Music/Cover/' + item.musicId + '?' + new Date().getTime()" style="width:120px; height: 120px;  border: 1px solid transparent;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/music/' + item.musicId">
                            <p style="margin-left: 0px; font-size: 16px;">{{ item.name }}</p>
                          </router-link>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.album }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <el-icon color="#888" style="font-size: 14px; margin-top:0px"><Headset /></el-icon>
                          <span style="margin-left: 3px; font-size: 14px; margin-top:0px; color: #888">{{ item.view }}</span>
                          <p style="position: relative;z-index:10; margin-left:-78px; margin-top:-24px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>

                        <router-link :to="'/create/edit/' + item.musicId" style="margin-top:100px; margin-left:376px; height:34px">
                          <el-button  style="width:80px; --el-color-primary:#FFA500" plain>编辑</el-button>
                        </router-link>
                        <el-popconfirm
                          confirm-button-text="确认"
                          cancel-button-text="取消"
                          title="确定要永久性删除稿件吗？"
                          width="220px"
                          @confirm="confirmDelete(item.musicId)"
                        >
                          <template #reference>
                            <el-button  style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:#FFA500" plain>删除</el-button>
                          </template>
                        </el-popconfirm>
                        <div v-if="item.status == 0" style="display:inline-block; margin-top:40px;">
                          <span style="margin-left: -124px; font-size: 14px; color: #888">稿件审核中</span>
                        </div>
                        <div v-if="item.status == 3" style="display:inline-block; margin-top:40px;">
                          <span style="margin-left: -140px; font-size: 14px; color: red">稿件审核未通过</span>
                        </div>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>

              <div style="margin-bottom:40px" />


          </el-tab-pane>
            <el-tab-pane label="审核中" name="pending">


              <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>
              <p v-if="musics.filter(item => item.status == 0) == 0" style="text-align:center; color:#888; margin-top:30px;">目前没有正在审核中的音乐哦</p>
                  <div v-for="(item, index) in musics" :key="index">
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
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <el-icon color="#888" style="font-size: 14px; margin-top:0px"><Headset /></el-icon>
                          <span style="margin-left: 3px; font-size: 14px; margin-top:0px; color: #888">{{ item.view }}</span>
                          <p style="position: relative;z-index:10; margin-left:-78px; margin-top:-24px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>

                          <el-button  style="width:80px; margin-top:100px; margin-left:376px; --el-color-primary:#FFA500" plain>编辑</el-button>
                          <el-button  style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:#FFA500" plain>删除</el-button>
                        <div style="display:inline-block; margin-top:40px;">
                          <span style="margin-left: -124px; font-size: 14px; color: #888">稿件审核中</span>
                        </div>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>
            </div>

              <div style="margin-bottom:40px" />


            </el-tab-pane>
              <el-tab-pane label="已通过" name="approved">


                <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>
              <p v-if="musics.filter(item => item.status == 1) == 0" style="text-align:center; color:#888; margin-top:30px;">目前没有已通过的音乐哦</p>
                  <div v-for="(item, index) in musics" :key="index">
                    <div v-if="item.status == 1">
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
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <el-icon color="#888" style="font-size: 14px; margin-top:0px"><Headset /></el-icon>
                          <span style="margin-left: 3px; font-size: 14px; margin-top:0px; color: #888">{{ item.view }}</span>
                          <p style="position: relative;z-index:10; margin-left:-78px; margin-top:-24px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>

                          <el-button  style="width:80px; margin-top:100px; margin-left:376px; --el-color-primary:#FFA500" plain>编辑</el-button>
                          <el-button  style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:#FFA500" plain>删除</el-button>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>
            </div>

              <div style="margin-bottom:40px" />


              </el-tab-pane>
                <el-tab-pane label="未通过" name="refused">


                  <el-divider style="margin-left:0px; width:930px; margin-top:10px; margin-bottom:0px"/>
              <p v-if="musics.filter(item => item.status == 2) == 0" style="text-align:center; color:#888; margin-top:30px;">目前没有未通过的音乐哦</p>
                  <div v-for="(item, index) in musics" :key="index">
                    <div v-if="item.status == 2">
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
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px;margin-bottom:10px; color: #888; white-space: nowrap">{{ formatDateTime(item.createdTime) }}</p>
                          <el-icon color="#888" style="font-size: 14px; margin-top:0px"><Headset /></el-icon>
                          <span style="margin-left: 3px; font-size: 14px; margin-top:0px; color: #888">{{ item.view }}</span>
                          <p style="position: relative;z-index:10; margin-left:-78px; margin-top:-24px;">
                            <span style="background:black; margin-left: 0px; font-size: 12px; margin-top:0px; color: white">{{ timeFormat(item.length) }}</span>
                          </p>
                          
                        </el-col>

                          <el-button  style="width:80px; margin-top:100px; margin-left:376px; --el-color-primary:#FFA500" plain>编辑</el-button>
                          <el-button  style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:#FFA500" plain>删除</el-button>
                          <div style="display:inline-block; margin-top:40px;">
                          <span style="margin-left: -140px; font-size: 14px; color: red">稿件审核未通过</span>
                        </div>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:890px; margin-top:0px; margin-bottom:0px"/>
              </div>
            </div>

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