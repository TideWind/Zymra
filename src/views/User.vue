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
  getFollowCount()
  getFanCount()
  getLikeCount()
  getUserMusics()
  getLikeMusics()
  getFollowState()
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

const userFollowCount = ref()
const userFanCount = ref()
const userLikeCount = ref()

const activeTab = ref('works')

const likeMusics = ref([])
const userMusics = ref([])

let getLikeMusics = async () => {
  let res = await proxy.$api.getLikeMusics(props.username)
  if (res.status == 200) {
    likeMusics.value = res.data
    //console.log(likeMusics.value)
  }
}

let getUserMusics = async () => {
  let res = await proxy.$api.getUserMusics(props.username)
  if (res.status == 200) {
    userMusics.value = res.data
    //console.log(res.data)
  }
}

let getFollowCount = async () => {
  let res = await proxy.$api.getFollowCount(props.username)
  if (res.status == 200) {
    userFollowCount.value = res.data
    //console.log(res.data)
  }
}

let getFanCount = async () => {
  let res = await proxy.$api.getFanCount(props.username)
  if (res.status == 200) {
    userFanCount.value = res.data
    //console.log(res.data)
  }
}

let getLikeCount = async () => {
  let res = await proxy.$api.getLikeCount(props.username)
  if (res.status == 200) {
    userLikeCount.value = res.data
    //console.log(res.data)
  }
}

const isFollowd = ref(false)

let getFollowState = async () => {
  let res = await proxy.$api.getFollowState(props.username)
  if (res.status == 200) {
    isFollowd.value = res.data
    //console.log(res.data)
  }
}

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':')
  return `${minutes}:${seconds}`
}

const btnText = ref("已关注")
const changeBtnText = () =>
{
  btnText.value = "取消关注"
}
const resetBtnText = () =>
{
  btnText.value = "已关注"
}

const follow = () =>
{
  followUser()
}

let followUser = async () => {
  let res = await proxy.$api.followUser(props.username)
  if (res.status == 200) {
    isFollowd.value = true
    getFanCount()
    //console.log(res.data)
  }
}

const cancelFollow = () =>
{
  cancelFollowUser()
}

let cancelFollowUser = async () => {
  let res = await proxy.$api.cancelFollowUser(props.username)
  if (res.status == 200) {
    isFollowd.value = false
    getFanCount()
    //console.log(res.data)
  }
}


</script>

<template>
          <el-container style="display: grid; place-items: center;">
              <el-card class="card" style="width:1080px; min-height: 700px">

                  <el-row style="margin-top: 30px; margin-bottom:40px;">
                    <el-card style="width: 180px; height: 180px; margin-left: 40px; --el-card-padding: 4px;" shadow="never">
                      <el-image style="width: 172px; height: 172px;" :src="'/api/User/Avatar/' + username + '?' + new Date().getTime()" :fit="cover">
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
                          <router-link :to="'/follow/' + username">
                            <p style="font-size:22px;">{{ userFollowCount }}</p>
                            <p style="font-size:14px; margin-top:-18px; color: #888">关注</p>
                          </router-link>
                        </div>

                        <el-divider direction="vertical" style="height:40px; margin-top:-34px; margin-left:30px" />

                        <div style="display:inline-block; margin-left: 20px; text-align: center;">
                          <router-link :to="'/fans/' + username">
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

                        <div v-else style="margin-left:628px; margin-top:-170px">
                          <el-button v-if="!isFollowd" @click="follow" color="#FFA500" style="width:100px; font-weight:bold" plain >关注</el-button>
                          <el-button v-else @click="cancelFollow" color="#FFA500" style="width:100px; font-weight:bold" @mouseenter="changeBtnText" @mouseleave="resetBtnText" plain >{{ btnText }}</el-button>
                        </div>

                      </div>
                    </div> 
                  </el-row>
                        
                  <!-- <span style="font-weight: bold; font-size:20px; margin-left:44px;">喜欢的音乐</span> -->

                  <el-tabs v-model="activeTab" style="--el-font-size-base:18px; margin-left:44px; --el-color-primary:#FFA500;--el-border-color-light:transparent; width:946px">
                    <el-tab-pane label="投稿" name="works">

                      
                      <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:-5px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-105px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:290px">
                      <p style="margin-left: 0px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:75px">
                      <p style="margin-left: 68px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:0px; margin-right:0px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  <p v-if="userMusics.length == 0" style="text-align:center; color:#888">用户还没有投稿过音乐哦</p>

                  <el-card class="display_card" v-for="(item, index) in userMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
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
                        <el-col :span="4" style="margin-top:-6px; margin-left:260px">
                          <p style="margin-left: 0px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:60px">
                          <p style="margin-left: 80px; font-size: 14px; margin-top:28px; color: #888">{{ timeFormat(item.length) }}</p>
                        </el-col>
                    </el-row>
                  </router-link>
                </el-card>

                <div style="margin-bottom:40px" />


                    </el-tab-pane>
                    <el-tab-pane label="喜欢" name="likes">
                      

                  <el-row style="margin-top:-4px">
                    <el-col :span="4" style="margin-top:9px; margin-left:-5px">
                      <p style="margin-left: 44px; font-size: 12px; color: #888">#</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:9px; margin-left:-105px">
                      <p style="margin-left: 28px; font-size: 12px; color: #888">标题</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-5px; margin-left:-100px">
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:290px">
                      <p style="margin-left: 0px; font-size: 12px; margin-top:28px; color: #888">专辑</p>
                    </el-col>
                    <el-col :span="4" style="margin-top:-6px; margin-left:75px">
                      <p style="margin-left: 68px; font-size: 12px; margin-top:28px; color: #888">时长</p>
                    </el-col>
                  </el-row>

                  <div class="container_justify">
                    <el-divider style="margin-left:0px; margin-right:0px; margin-top:6px; margin-bottom:10px"/>
                  </div>

                  <p v-if="likeMusics.length == 0" style="text-align:center; color:#888">用户还没有喜欢过音乐哦</p>
                  
                  <el-card class="display_card" v-for="(item, index) in likeMusics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
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
                        <el-col :span="4" style="margin-top:-6px; margin-left:260px">
                          <p style="margin-left: 0px; font-size: 14px; margin-top:28px; color: #888">{{ item.album }}</p>
                        </el-col>
                        <el-col :span="4" style="margin-top:-6px; margin-left:60px">
                          <p style="margin-left: 80px; font-size: 14px; margin-top:28px; color: #888">{{ timeFormat(item.length) }}</p>
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
