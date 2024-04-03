<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import { useRoute } from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import Cookies from 'js-cookie'
import { useRouter } from "vue-router";

const route = useRoute()
const router = useRouter();

onMounted(async() =>{
  if(route.query.type)
    requirement.value.type = route.query.type
  if(route.query.order)
    requirement.value.order = route.query.order
  if(route.query.keyword)
    requirement.value.keyword = route.query.keyword
  searchMusic()
})

let getFollowState = async (username) => {
  if(!Cookies.get('access_token'))
    return false
  let res = await proxy.$api.getFollowState(username)
  if (res.status == 200) {
    return res.data
  }
}

const musics = ref([]);
const users = ref([]);

const { proxy } = getCurrentInstance()

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':');
  return `${minutes}:${seconds}`;
}

const requirement = ref({
  keyword:'',
  initial:'All',
  type:'All',
  order:'Des'
})

const activeTab = ref('music')

const search = () =>
{
  searchMusic()
  searchUser()
  didSearch.value = true
  if(requirement.value.keyword == '')
    didSearch.value = false
}

let searchMusic = async () => {
  let res = await proxy.$api.searchMusic(requirement.value)
  if (res.status == 200) {
    musics.value = res.data;
  }
}

let searchUser = async () => {
  let res = await proxy.$api.searchUser({keyword : requirement.value.keyword})
  if (res.status == 200) {
    btnText.value = []
    users.value = res.data
    for(const index in users.value)
    {
      btnText.value.push(await getFollowState(users.value[index].username))
    }
  }
}

const btnText = ref([])

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

const didSearch = ref(false)

</script>

<template>
  <el-container style="display: grid; place-items: center;">
    <el-card class="card" style="width:1080px; min-height:700px">

      <div style="display: grid; place-items: center;">
      <el-input
        v-model="requirement.keyword"
        style="width: 360px; margin-top:50px; height: 40px; margin-left: -40px; margin-right: 10px; --el-color-primary:#FFA500"
        clearable
        placeholder="输入关键字搜索"
        :prefix-icon="Search"
      />
      <el-button @click="search" style="width: 80px; height: 40px; margin-left: 390px; margin-top: -40px" color="#FFA500" plain>搜索</el-button>
      </div>

      <el-tabs v-model="activeTab" style="margin-left:-4px;--el-text-color-primary:#888; --el-color-primary:#FFA500;--el-border-color-light:transparent; width:946px">
          <el-tab-pane label="音乐" name="music">

      <div style="margin-top: 10px; margin-left:5px">
    <el-radio-group @change="search" class="small" v-model="requirement.initial" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
      <el-radio-button label="全部" value="All" />
      <el-radio-button label="A" value="A" />
      <el-radio-button label="B" value="B" />
      <el-radio-button label="C" value="C" />
      <el-radio-button label="D" value="D" />
      <el-radio-button label="E" value="E" />
      <el-radio-button label="F" value="F" />
      <el-radio-button label="G" value="G" />
      <el-radio-button label="H" value="H" />
      <el-radio-button label="I" value="I" />
      <el-radio-button label="J" value="J" />
      <el-radio-button label="K" value="K" />
      <el-radio-button label="L" value="L" />
      <el-radio-button label="M" value="M" />
      <el-radio-button label="N" value="N" />
      <el-radio-button label="O" value="O" />
      <el-radio-button label="P" value="P" />
      <el-radio-button label="Q" value="Q" />
      <el-radio-button label="R" value="R" />
      <el-radio-button label="S" value="S" />
      <el-radio-button label="T" value="T" />
      <el-radio-button label="U" value="U" />
      <el-radio-button label="V" value="V" />
      <el-radio-button label="W" value="W" />
      <el-radio-button label="X" value="X" />
      <el-radio-button label="Y" value="Y" />
      <el-radio-button label="Z" value="Z" />
      <el-radio-button label="#" value="#" />
    </el-radio-group>
  </div>
      <div style="margin-top: 6px;">
    <el-radio-group @change="search" v-model="requirement.type" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
      <el-radio-button label="全部" value="All" />
      <el-radio-button label="流行" value="Popular" />
      <el-radio-button label="摇滚" value="Rock" />
      <el-radio-button label="民谣" value="Ballad" />
      <el-radio-button label="电子" value="Electron" />
    </el-radio-group>
  </div>
  <div style="margin-top: 2px; margin-bottom:20px">
  <el-radio-group @change="search" v-model="requirement.order" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
      <el-radio-button label="最新作品" value="Des" />
      <el-radio-button label="由旧到新" value="Asc" />
    </el-radio-group>
  </div>

      <el-row style="margin-top:-4px; width:940px">
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

                  <p v-if="musics.length == 0" style="text-align:center; color:#888">抱歉，无法找到搜索结果</p>

                  <el-card class="display_card" v-for="(item, index) in musics" :key="index" shadow="hover" style="--el-card-padding:2px; margin-top:6px; margin-left:6px; margin-right:6px; height:65px; border:0px">
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
              <el-tab-pane label="作者" name="user">

                <el-divider style="margin-left:20px; width:910px; margin-top:10px; margin-bottom:0px"/>
                <p v-if="users.length == 0 && !didSearch" style="text-align:center; color:#888; margin-top:30px;">输入关键字以搜索用户</p>
                <p v-if="users.length == 0 && didSearch" style="text-align:center; color:#888; margin-top:30px;">抱歉，无法找到搜索结果</p>
                  <div v-for="(item, index) in users" :key="index">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:940px;margin-left:0px; margin-right:0px; height:100px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:20px;">
                          <el-image :src="'/api/User/Avatar/' + item.username" style="width:60px; height: 60px;  border: 1px solid transparent;" fit="cover">
                          <template #error>
                            <div class="list-image-slot">
                              <el-icon><icon-picture /></el-icon>
                            </div>
                          </template>
                          </el-image>
                        </el-col>
                        <el-col :span="16" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/user/' + item.username">
                            <p class="user" style="margin-left: -80px; margin-top:24px; font-size: 16px;">{{ item.nickname }}</p>
                          </router-link>
                          <p style="margin-left: -80px; font-size: 14px; margin-top:-10px; color: #888; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis;">{{ item.describe }}</p>
                        </el-col>

                          <!-- <el-button v-if="!isFollowd(item.username)" @click="follow(item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>关注</el-button>
                          <el-button v-else @click="cancelFollow(item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>已关注</el-button> -->
                          <el-button @click="btnClick($event, item.username)" style="width:80px; margin-top:30px; margin-left:46px; --el-color-primary:#FFA500" plain>{{ btnText[index]? "已关注" : "关注" }}</el-button>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:910px; margin-top:0px; margin-bottom:0px"/>
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

.user:hover {
  color: #ea9800;
}
</style>

<style>
.el-radio-button__inner {
  margin: 6px;
  padding: 8px 10px;
}
.small .el-radio-button__inner {
  margin: 1px;
  padding: 8px 10px;
}

.list-image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.list-image-slot .el-icon {
  font-size: 20px;
}
  </style>