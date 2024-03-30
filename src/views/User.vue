<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
import store from '../store/index.ts';
import { Picture as IconPicture } from '@element-plus/icons-vue'
import Cookies from 'js-cookie'

const router = useRouter();

const props = defineProps({
    username: String
})


onMounted(() =>{
  getUserInfo()
  getLikeMusics()
})

const userInfo = ref({
  userAvatar : ' ',
  userNickname : ' ',
  userName : ' ',
  userDescribe : ' ',
})

const { proxy } = getCurrentInstance()

let getUserInfo = async () => {
  let res = await proxy.$api.getUserInfo(props.username)
  console.log(res)
  if (res.status == 200) {
    userInfo.value.userNickname = res.data.nickname
    userInfo.value.userName = res.data.username
    userInfo.value.userDescribe = res.data.describe
  }
}

const loginout = () => {
  store.commit('clearAccessToken')
  store.commit('clearRefreshToken')
  store.commit('clearCurrentUsername')
  router.push({path: '/'})
}

const userFollowCount = 87
const userFanCount = 3649
const userLikeCount = 53848

// const likeMusics = ref([
//   {
//     src: "https://cdn.piapro.jp/thumb_i/wk/wke4xlhvfydnnvid_20191030191544_0250_0250.jpg",
//     name: "糸",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m1"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/a1/a1m3sp8gyhj0rd9n_20191030190520_0250_0250.jpg",
//     name: "心臓と絡繰",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m2"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/7x/7xoejj44vhinf86z_20191030191443_0250_0250.jpg",
//     name: "魔女",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m3"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/j8/j8o8txebob6v4nv7_20191030190730_0250_0250.jpg",
//     name: "quiz",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m4"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/an/anwubj2862wrdt41_20191030191118_0250_0250.jpg",
//     name: "そして花になる",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m5"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg",
//     name: "過去を喰らう",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m6"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/d4/d4ukt2vj57ujiafj_20191030190947_0250_0250.jpg",
//     name: "夜が降り止む前に",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m7"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/ve/vexeeei0exa99y9y_20191030191733_0250_0250.jpg",
//     name: "夜行バスにて",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m8"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/uf/uf9a8v5e19pn23ia_20191030191300_0250_0250.jpg",
//     name: "忘れてしまえ",
//     vocal:"花譜",
//     album:"不可解",
//     length:"04:19",
//     mid: "m9"
//   },
// ]);

const likeMusics = ref([])

let getLikeMusics = async () => {
  let res = await proxy.$api.getLikeMusics(props.username)
  if (res.status == 200) {
    likeMusics.value = res.data;
    console.log(res.data)
  }
}

</script>

<template>
          <el-container style="display: grid; place-items: center;">
              <el-card class="card" style="width:1080px; height: 1080px">

                  <el-row style="margin-top: 30px; margin-bottom:40px;">
                    <el-card style="width: 180px; height: 180px; margin-left: 40px; --el-card-padding: 4px;" shadow="never">
                      <el-image style="width: 172px; height: 172px;" :src="'/api/User/Avatar/' + username" :fit="cover">
                        <template #error>
                          <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                          </div>
                        </template>
                      </el-image>
                    </el-card>
                    <div>

                      <div style="display:inline-block;">
                        <p style="font-weight: bold; margin-top:4px; margin-left: 40px; font-size:26px">{{ userInfo.userNickname }}</p>
                        <p style="margin-top:-26px; margin-left: 40px; font-size:14px; color: #888">@{{ userInfo.userName }}</p>
                        <p style="margin-top:0px; margin-left: 40px; font-size:14px; color: #888">{{ userInfo.userDescribe }}</p>
                      </div>

                      <el-divider style="margin-top:0px; margin-left:30px; width:740px"/>

                      <div style="margin-top:-30px; margin-left: 40px;">
                        
                        <div style="display:inline-block; margin-left: 20px; text-align: center;">
                          <router-link :to="'/user/follow'">
                            <p style="font-size:22px;">{{ userFollowCount }}</p>
                            <p style="font-size:14px; margin-top:-18px; color: #888">关注</p>
                          </router-link>
                        </div>

                        <el-divider direction="vertical" style="height:40px; margin-top:-34px; margin-left:30px" />

                        <div style="display:inline-block; margin-left: 20px; text-align: center;">
                          <router-link :to="'/user/fans'">
                            <p style="font-size:22px;">{{ userFanCount }}</p>
                            <p style="font-size:14px; margin-top:-18px; color: #888">粉丝</p>
                          </router-link>
                        </div>

                        <el-divider direction="vertical" style="height:40px; margin-top:-34px; margin-left:30px" />

                        <div style="display:inline-block; margin-left: 20px; text-align: center;">
                          <p style="font-size:22px;">{{ userLikeCount }}</p>
                          <p style="font-size:14px; margin-top:-18px; color: #888">喜欢</p>
                        </div>

                        <div v-if="username == Cookies.get('current_username')" style="margin-left:614px; margin-top:-190px">
                          <div style="display:grid">
                            <el-button  @click="loginout" text>退出登录</el-button>
                            <router-link :to="'/user/edit'" style="margin-top:6px">
                              <el-button @click="editUserInfo" color="#FFA500" style="" plain >编辑个人资料</el-button>
                            </router-link>
                          </div>
                        </div>

                        <div v-else style="style:inline-block; margin-left:628px; margin-top:-170px">
                        <el-button @click="follow" color="#FFA500" style="width:100px; font-weight:bold" plain >关注</el-button>
                        </div>

                      </div>
                    </div> 
                  </el-row>
                        
                  <span style="font-weight: bold; font-size:20px; margin-left:44px;">喜欢的音乐</span>

                  <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:30px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-120px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:300px">
                      <p style="margin-left: 0px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:40px">
                      <p style="margin-left: 68px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:40px; margin-right:40px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  
                  <el-card class="display_card" v-for="(item, index) in likeMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:0px; margin-left:40px; margin-right:40px; height:65px; border:0px">
                    <router-link :to="'/music/' + item.musicId">
                      <el-row >
                        <el-col :span="4" style="margin-top:8px; margin-left:30px">
                          <p style="margin-left: 0px; font-size: 14px; color: #888">{{ index + 1 }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:5px; margin-left:-120px">
                          <el-image :src="'/api/Music/Cover/' + item.musicId" style="width:50px; height: 50px;  border: 1px solid transparent; border-radius: 8px;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                          <p style="margin-left: 0px; font-size: 14px;">{{ item.name }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.users[0].nickname }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:300px">
                          <p style="margin-left: 0px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:40px">
                          <p style="margin-left: 80px; font-size: 14px; margin-top:28px; color: #888">{{ item.length }}</p>
                        </el-col>
                    </el-row>
                  </router-link>
                </el-card>
                  
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

.display_card:hover {
  position: relative;
  z-index: 1;
}

.image-slot {
  
  width:172px;
  height:172px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  margin-left:70px;
  margin-top:70px;
  font-size: 30px;
}
</style>
