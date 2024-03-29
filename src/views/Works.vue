<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Headset } from '@element-plus/icons-vue'

onMounted(() =>{

})

const musics = ref([
  {
    src: "https://cdn.piapro.jp/thumb_i/wk/wke4xlhvfydnnvid_20191030191544_0250_0250.jpg",
    name: "糸",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m1",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/a1/a1m3sp8gyhj0rd9n_20191030190520_0250_0250.jpg",
    name: "心臓と絡繰",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m2",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/7x/7xoejj44vhinf86z_20191030191443_0250_0250.jpg",
    name: "魔女",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m3",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/j8/j8o8txebob6v4nv7_20191030190730_0250_0250.jpg",
    name: "quiz",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m4",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/an/anwubj2862wrdt41_20191030191118_0250_0250.jpg",
    name: "そして花になる",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m5",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg",
    name: "過去を喰らう",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m6",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/d4/d4ukt2vj57ujiafj_20191030190947_0250_0250.jpg",
    name: "夜が降り止む前に",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m7",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/ve/vexeeei0exa99y9y_20191030191733_0250_0250.jpg",
    name: "夜行バスにて",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m8",
    view:25565
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/uf/uf9a8v5e19pn23ia_20191030191300_0250_0250.jpg",
    name: "忘れてしまえ",
    vocal:"花譜",
    album:"不可解",
    length:"04:19",
    mid: "m9",
    view:25565
  },
]);

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px; height:1800px">
      <el-divider style="margin-left:20px; width:976px; margin-top:40px; margin-bottom:0px"/>
                  <div v-for="(item, index) in musics" :key="index">
      <el-card class="display_card"  shadow="none" style="--el-card-padding:2px; width:1000px;margin-left:20px; margin-right:0px; height:160px; border:0px">
                    
                      <el-row >
                        <el-col :span="4" style="margin-top:16px; margin-left:0px;">
                          <el-image :src="item.src" style="width:120px; height: 120px;  border: 1px solid transparent;" fit="cover"/>
                        </el-col>
                        <el-col :span="4" style="margin-top:0px; margin-left:0px">
                          <router-link :to="'/music/' + item.mid">
                            <p style="margin-left: 0px; font-size: 16px;">{{ item.name }}</p>
                          </router-link>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.vocal }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.album }}</p>
                          <p style="margin-left: 0px; font-size: 14px; margin-top:-10px; color: #888">{{ item.length }}</p>
                          <el-icon color="#888" style="font-size: 14px; margin-top:-10px"><Headset /></el-icon>
                          <span style="margin-left: 3px; font-size: 14px; margin-top:0px; color: #888">{{ item.view }}</span>
                        </el-col>

                          <el-button  style="width:80px; margin-top:100px; margin-left:460px; --el-color-primary:#FFA500" plain>编辑</el-button>
                          <el-button  style="width:80px; margin-top:100px; margin-left:20px; --el-color-primary:#FFA500" plain>删除</el-button>
                        <div v-if="true" style="display:inline-block; margin-top:40px;">
                          <span style="margin-left: -124px; font-size: 14px; color: #888">稿件审核中</span>
                        </div>
                    </el-row>
                  
                </el-card>
                <el-divider style="margin-left:20px; width:976px; margin-top:0px; margin-bottom:0px"/>
              </div>
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