<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import Cookies from 'js-cookie'

const props = defineProps({
    username: String
})

onMounted(async() =>{
  getUserInfo()
  await getFollows()
  for(const index in follows.value)
    {
      //console.log(follows.value[index])
      btnText.value.push(await getFollowState(follows.value[index].username))
    }
})

const nickname = ref('')
const follows = ref([])
const btnText = ref([])

const isFollowsLoad = ref(false)

const { proxy } = getCurrentInstance()

let getUserInfo = async () => {
  let res = await proxy.$api.getUserInfo(props.username)
  if (res.status == 200) {
    nickname.value = res.data.nickname
  }
}

let getFollows = async () => {
  let res = await proxy.$api.getFollows(props.username)
  if (res.status == 200) {
    follows.value = res.data
    isFollowsLoad.value = true
    //console.log(follows.value)
  }
}

const btnClick = async(event, username) =>
{
  if(!Cookies.get('access_token'))
  {
    router.push({name: 'Login'})
    return false
  }
  const clickedButton = event.target
  const isFollowd = await getFollowState(username)
  //console.log(isFollowd)
  if(!isFollowd)
  {
    followUser(username, clickedButton)
  }
  else
  {
    cancelFollowUser(username, clickedButton)
  }
}

let getFollowState = async (username) => {
  if(!Cookies.get('access_token'))
    return false
  let res = await proxy.$api.getFollowState(username)
  if (res.status == 200) {
    return res.data
  }
}

let followUser = async (username, clickedButton) => {
  let res = await proxy.$api.followUser(username)
  if (res.status == 200) {
    clickedButton.textContent = '已关注'
  }
}

let cancelFollowUser = async (username, clickedButton) => {
  let res = await proxy.$api.cancelFollowUser(username)
  if (res.status == 200) {
    clickedButton.textContent = '关注'
  }
}

</script>

<template>
  <el-container style="display: grid; place-items: center;">
    <el-card class="card" style="width:1080px; min-height:700px">

      <p style="font-size:18px; margin-left:20px"><router-link :to="'/user/' + username">{{ nickname }}</router-link>的关注</p>    
            <el-divider style="margin-left:20px; width:980px; margin-top:10px; margin-bottom:0px"/>

    <el-skeleton style="width: 946px; margin-top:20px" :loading="!isFollowsLoad" :throttle="500" animated :count="3">
      <template #template>
        <div style="padding: 14px">
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
            <p v-if="follows.length == 0 && isFollowsLoad" style="text-align:center; color:#888; margin-top:30px;">目前没有关注的用户哦</p>
                  <div v-for="(item, index) in follows" :key="index">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:1000px;margin-left:20px; margin-right:0px; height:100px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:20px;">
                          <el-image :src="'/api/User/Avatar/' + item.username" style="width:60px; height: 60px;  border: 1px solid transparent;" fit="cover"/>
                        </el-col>
                        <el-col :span="16" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/user/' + item.username">
                            <p style="margin-left: -80px; margin-top:24px; font-size: 16px;">{{ item.nickname }}</p>
                          </router-link>
                          <p style="margin-left: -80px; font-size: 14px; margin-top:-10px; color: #888; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis;">{{ item.describe }}</p>
                        </el-col>

                          <!-- <el-button v-if="!isFollowd(item.username)" @click="follow(item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>关注</el-button>
                          <el-button v-else @click="cancelFollow(item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>已关注</el-button> -->
                          <el-button @click="btnClick($event, item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>{{ btnText[index]? "已关注" : "关注" }}</el-button>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:980px; margin-top:0px; margin-bottom:0px"/>
              </div>
      </template>
    </el-skeleton>

              <div style="margin-bottom:40px" />


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