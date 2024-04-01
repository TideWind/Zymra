<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { Headset } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

onMounted(() =>{
  getYearPopularMusics()
  getMonthPopularMusics()
  getWeekPopularMusics()
})

const yearMusics = ref([]);
const monthMusics = ref([]);
const weekMusics = ref([]);

const { proxy } = getCurrentInstance()

let getYearPopularMusics = async () => {
  let res = await proxy.$api.getYearPopularMusics(20)
  if (res.status == 200) {
    yearMusics.value = res.data;
  }
}

let getMonthPopularMusics = async () => {
  let res = await proxy.$api.getMonthPopularMusics(20)
  if (res.status == 200) {
    monthMusics.value = res.data;
  }
}

let getWeekPopularMusics = async () => {
  let res = await proxy.$api.getWeekPopularMusics(20)
  if (res.status == 200) {
    weekMusics.value = res.data;
  }
}

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':');
  return `${minutes}:${seconds}`;
}

const activeTab = ref('year')

</script>

<template>
  <el-container style="display: grid; place-items: center;">
    <el-card class="card" style="width:1080px; min-height:700px">

      <el-tabs v-model="activeTab" style="margin-left:0px;--el-text-color-primary:#888; --el-color-primary:#FFA500;--el-border-color-light:transparent; width:946px">
          <el-tab-pane label="年榜" name="year">

            <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:-5px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-105px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:200px">
                      <p style="margin-left: 60px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 66px; font-size: 12px; margin-top:28px; color: #888">播放</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 72px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:0px; margin-right:0px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  <p v-if="yearMusics.length == 0" style="text-align:center; color:#888">还没有上榜的音乐哦</p>

                  <el-card class="display_card" v-for="(item, index) in yearMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
                    <router-link :to="'/music/' + item.musicId">
                      <el-row >
                        <el-col :span="4" style="margin-top:8px; margin-left:30px">
                          <p style="margin-left: 0px; font-size: 14px; color: #888">{{ index + 1 }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:5px; margin-left:-120px">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:50px; height: 50px;  border: 1px solid transparent; border-radius: 8px;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:-5px; margin-left:-90px">
                          <p style="margin-left: 0px; font-size: 14px;">{{ item.name }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:180px">
                          <p style="margin-left: 50px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 60px; font-size: 14px; margin-top:28px; color: #888">{{ item.view }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 62px; font-size: 14px; margin-top:28px; color: #888">{{ timeFormat(item.length) }}</p>
                        </el-col>
                    </el-row>
                  </router-link>
                </el-card>

                <div style="margin-bottom:40px" />


          </el-tab-pane>
            <el-tab-pane label="月榜" name="month">


              <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:-5px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-105px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:200px">
                      <p style="margin-left: 60px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 66px; font-size: 12px; margin-top:28px; color: #888">播放</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 72px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:0px; margin-right:0px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  <p v-if="monthMusics.length == 0" style="text-align:center; color:#888">还没有上榜的音乐哦</p>

                  <el-card class="display_card" v-for="(item, index) in monthMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
                    <router-link :to="'/music/' + item.musicId">
                      <el-row >
                        <el-col :span="4" style="margin-top:8px; margin-left:30px">
                          <p style="margin-left: 0px; font-size: 14px; color: #888">{{ index + 1 }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:5px; margin-left:-120px">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:50px; height: 50px;  border: 1px solid transparent; border-radius: 8px;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:-5px; margin-left:-90px">
                          <p style="margin-left: 0px; font-size: 14px;">{{ item.name }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:180px">
                          <p style="margin-left: 50px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 60px; font-size: 14px; margin-top:28px; color: #888">{{ item.view }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 62px; font-size: 14px; margin-top:28px; color: #888">{{ timeFormat(item.length) }}</p>
                        </el-col>
                    </el-row>
                  </router-link>
                </el-card>

                <div style="margin-bottom:40px" />


            </el-tab-pane>
              <el-tab-pane label="周榜" name="week">


                <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:-5px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-105px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:200px">
                      <p style="margin-left: 60px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 66px; font-size: 12px; margin-top:28px; color: #888">播放</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                      <p style="margin-left: 72px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:0px; margin-right:0px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  <p v-if="weekMusics.length == 0" style="text-align:center; color:#888">还没有上榜的音乐哦</p>

                  <el-card class="display_card" v-for="(item, index) in weekMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
                    <router-link :to="'/music/' + item.musicId">
                      <el-row >
                        <el-col :span="4" style="margin-top:8px; margin-left:30px">
                          <p style="margin-left: 0px; font-size: 14px; color: #888">{{ index + 1 }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:5px; margin-left:-120px">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:50px; height: 50px;  border: 1px solid transparent; border-radius: 8px;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:-5px; margin-left:-90px">
                          <p style="margin-left: 0px; font-size: 14px;">{{ item.name }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:180px">
                          <p style="margin-left: 50px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 60px; font-size: 14px; margin-top:28px; color: #888">{{ item.view }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:0px">
                          <p style="margin-left: 62px; font-size: 14px; margin-top:28px; color: #888">{{ timeFormat(item.length) }}</p>
                        </el-col>
                    </el-row>
                  </router-link>
                </el-card>

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