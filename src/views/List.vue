<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"

onMounted(() =>{
  getRecommendMusics()
})

const musics = ref([]);

const { proxy } = getCurrentInstance()

let getRecommendMusics = async () => {
  let res = await proxy.$api.getRecommendMusics(32)
  if (res.status == 200) {
    musics.value = res.data;
  }
}

const timeFormat = (value) =>
{
  const [hours, minutes, seconds] = value.split(':');
  return `${minutes}:${seconds}`;
}

const radio0 = ref('All')
const radio = ref('New York')
const radio1 = ref('New York')

const requirement = ref({
  initial:'All',
  type:'All',
  order:'Des'
})

</script>

<template>
  <el-container style="display: grid; place-items: center;">
    <el-card class="card" style="width:1080px; min-height:700px">

      <div style="margin-top: 50px; margin-left:5px">
    <el-radio-group class="small" v-model="requirement.initial" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
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
      <el-radio-button label="U" value="Y" />
      <el-radio-button label="V" value="V" />
      <el-radio-button label="W" value="W" />
      <el-radio-button label="X" value="X" />
      <el-radio-button label="Y" value="Y" />
      <el-radio-button label="Z" value="Z" />
      <el-radio-button label="#" value="#" />
    </el-radio-group>
  </div>
      <div style="margin-top: 6px;">
    <el-radio-group v-model="requirement.type" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
      <el-radio-button label="全部" value="All" />
      <el-radio-button label="流行" value="Popular" />
      <el-radio-button label="摇滚" value="Rock" />
      <el-radio-button label="民谣" value="Ballad" />
      <el-radio-button label="电子" value="Electron" />
    </el-radio-group>
  </div>
  <div style="margin-top: 2px; margin-bottom:20px">
  <el-radio-group v-model="requirement.order" style="--el-border:0px; --el-border-radius-base:0px; --el-color-primary:#FFA500">
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

                  <p v-if="musics.length == 0" style="text-align:center; color:#888">还没有推荐的音乐哦</p>

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
.el-radio-button__inner {
  margin: 6px;
  padding: 8px 10px;
}
.small .el-radio-button__inner {
  margin: 1px;
  padding: 8px 10px;
}
  </style>