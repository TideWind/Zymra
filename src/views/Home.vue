<script setup lang="ts">
import { ref, onMounted, computed, getCurrentInstance  } from "vue"
import ColorThief from 'colorthief/dist/color-thief.mjs'

onMounted(() =>{
  getRecommendMusics()
  getPopularMusics()
  getNewMusics()
  getTypeView()
})

const isRecommendMusicsLoad = ref(false)
const isPopularMusicsLoad = ref(false)
const isNewMusicsLoad = ref(false)

const banner_images = ref([
  "/banner/1.png",
  "/banner/2.png",
  "/banner/3.png",
  "/banner/4.png"
]);

const colorThief = new ColorThief();
let mainColor = ref()
function OnChange(index: number) {
  const currentBanner = document.querySelectorAll('.el-carousel__item')[index];
  const currentImage = currentBanner.querySelector('img');
  mainColor.value = `rgb(${colorThief.getColor(currentImage).join(',')})`;
  currentBanner.style.backgroundColor = mainColor.value;
  //console.log(mainColor);
}

function getImagesSrc(name: string) {
    return new URL(`${name}`, import.meta.url).href;
}

const explore_rows = computed(() => {
  const itemsPerRow = 4;
  const result = [];
  for (let i = 0; i < display_rec.value.length; i += itemsPerRow) {
    result.push(display_rec.value.slice(i, i + itemsPerRow));
  }
  return result;
});

const new_rows = computed(() => {
  const itemsPerRow = 4;
  const result = [];
  for (let i = 0; i < display_new.value.length; i += itemsPerRow) {
    result.push(display_new.value.slice(i, i + itemsPerRow));
  }
  return result;
});

import { useRouter } from "vue-router";
const router = useRouter();
const clickClassCard = (type:string) => {
      //console.log(type);
      router.push({name: 'List', query: { type:type },});
}

const canDataLoad = ref(false);

        const clientHight = document.documentElement.clientHeight;
        //console.log('视窗高度', clientHight);
        window.addEventListener('scroll', () => {
          const clientHight = document.documentElement.clientHeight;
          const target = document.getElementById('target')
            const DOMRectInfo = target?.getBoundingClientRect()
            // console.log(DOMRectInfo);
            if (DOMRectInfo?.top <= clientHight && DOMRectInfo?.top > clientHight - DOMRectInfo?.height) {
              view_popular.value = view_popular_num.value;
              view_rock.value = view_rock_num.value;
              view_ballad.value = view_ballad_num.value;
              view_electron.value = view_electron_num.value;
                //console.log('目标元素进入可视区');
            } else if (DOMRectInfo?.top <= 0 && DOMRectInfo?.top > -DOMRectInfo?.height) {;
                //console.log('目标元素正在离开可视区');
            }
            else{
              view_popular.value = 0;
              view_rock.value = 0;
              view_ballad.value = 0;
              view_electron.value = 0;
            }
 
            if (DOMRectInfo?.bottom <= clientHight && DOMRectInfo?.bottom > DOMRectInfo?.height) {
              view_popular.value = view_popular_num.value;
              view_rock.value = view_rock_num.value;
              view_ballad.value = view_ballad_num.value;
              view_electron.value = view_electron_num.value;
                //console.log('目标元素完全进入可视区');
            } else if (DOMRectInfo?.bottom <= 0) {
                //console.log('目标元素完全离开可视区');
            }
            else{
              view_popular.value = 0;
              view_rock.value = 0;
              view_ballad.value = 0;
              view_electron.value = 0;
            }
        })

const view_popular_num = ref(0);
const view_rock_num = ref(0);
const view_ballad_num = ref(0);
const view_electron_num = ref(0);


import { useTransition } from '@vueuse/core'
const view_popular = ref(0);
const view_rock = ref(0);
const view_ballad = ref(0);
const view_electron = ref(0);

view_popular.value = view_popular_num.value;
view_rock.value = view_rock_num.value;
view_ballad.value = view_ballad_num.value;
view_electron.value = view_electron_num.value;

const view_popular_outputValue = useTransition(view_popular, {
  duration: 1000,
})
const view_rock_outputValue = useTransition(view_rock, {
  duration: 1000,
})
const view_ballad_outputValue = useTransition(view_ballad, {
  duration: 1000,
})
const view_electron_outputValue = useTransition(view_electron, {
  duration: 1000,
})

const display_chart = ref([])
const display_new = ref([])
const display_rec = ref([])

const { proxy } = getCurrentInstance()

let getRecommendMusics = async () => {
  let res = await proxy.$api.getRecommendMusics(8)
  if (res.status == 200) {
    display_rec.value = res.data;
    isRecommendMusicsLoad.value = true
    //console.log(res.data)
  }
}

let getPopularMusics = async () => {
  let res = await proxy.$api.getYearPopularMusics(9)
  if (res.status == 200) {
    display_chart.value = res.data;
    isPopularMusicsLoad.value = true
    //console.log(res.data)
  }
}

let getNewMusics = async () => {
  let res = await proxy.$api.getNewMusics(8)
  if (res.status == 200) {
    display_new.value = res.data;
    isNewMusicsLoad.value = true
    //console.log(res.data)
  }
}

let getTypeView = async () => {
  let res1 = await proxy.$api.getTypeView('popular')
  if (res1.status == 200) {
    view_popular_num.value = res1.data;
  }
  let res2 = await proxy.$api.getTypeView('rock')
  if (res2.status == 200) {
    view_rock_num.value = res2.data;
  }
  let res3 = await proxy.$api.getTypeView('ballad')
  if (res3.status == 200) {
    view_ballad_num.value = res3.data;
  }
  let res4 = await proxy.$api.getTypeView('electron')
  if (res4.status == 200) {
    view_electron_num.value = res4.data;
  }
}

</script>

<template>
        <el-carousel ref="car" :interval="5000" class="el-carouse" @change="OnChange">
          <el-carousel-item ref="banner" v-for="item in banner_images" :key="item">
            <el-image style="width:90%; height:100%; margin-left:5%" :src="getImagesSrc(item)" alt="" fit="cover"/>
          </el-carousel-item>
        </el-carousel>

        <div style="display: grid; place-items: center;">
          <el-container>
            <el-main class="main" style="padding: 0px;">
              <el-card class="card" style="width:800px; height: 1500px">
                <div class="container_align">
                  <img src="../assets/images/icon/music_point.svg" style="width:4%" alt="" />
                  <span style="font-weight: bold; margin-left:5px">猜你想听</span>
                  <router-link :to="'/explore'" style="margin-left:80%">
                    <p style="font-size: 14px; color: #888">更多></p>
                  </router-link>
                </div>
                <el-divider />

                <el-skeleton style="width: 780px" :loading="!isRecommendMusicsLoad" animated :count="1">
                      <template #template>
                        <div style="margin-left:20px">
                          <el-row class="container_justify" :gutter="0" v-for="(row, index) in [1, 2]">
                          <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in [1, 2, 3, 4]">
                          <el-skeleton-item variant="image" style="width: 150px; height: 150px;" />
                          <div
                            style="
                            display: flex;
                            align-items: center;
                            justify-items: space-between;
                            margin-left:0px;
                            margin-top: 14px;
                            height: 16px;
                            margin-bottom:16px"
                          >
                            <el-skeleton-item variant="text" style="width:150px" />
                          </div>
                        </el-col>
                      </el-row>
                        </div>
                      </template>
                      <template #default>
                <el-row class="container_justify" :gutter="0" v-for="(row, index) in explore_rows" :key="index">
                  <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in row" :key="columnIndex">

                        <router-link :to="'/music/' + item.musicId">
                          <el-image
                            class="display_card"
                            :src="'/api/Music/Cover/' + item.musicId"
                            style="width:150px; height: 150px"
                            fit="cover">
                            <template #placeholder>
                              <el-skeleton style="width: 150px" animated :count="1">
                                <template #template>
                                  <el-skeleton-item variant="image" style="width: 150px; height: 150px" />
                                </template>
                              </el-skeleton>
                            </template>
                          </el-image>
                          <p style="margin-top: 8px; font-size: 14px;">{{item.name}}</p>
                        </router-link>
                  </el-col>
                </el-row>
              </template>
                    </el-skeleton>

                <div class="container_align" style="margin-top:16px;">
                  <img src="../assets/images/icon/music_point.svg" style="width:4%" alt="" />
                  <span style="font-weight: bold; margin-left:5px">热门分类</span>
                  <router-link :to="'/list'" style="margin-left:80%">
                    <p style="font-size: 14px; color: #888">更多></p>
                  </router-link>
                </div>
                <el-divider/>
                <el-row class="container_justify">
                <el-card class="class_card" style=" width: 160px; height: 260px;
                  background: linear-gradient(to top right,
                  rgb(179, 252, 95),
                  rgb(36, 118, 58));" 
                  @click="clickClassCard('Popular')"
                >
                  <p style="font-size: 14px">流行</p>
                  <el-divider/>
                  <p style="font-size: 12px" >累计播放量</p>
                  <el-statistic id="target" value-style="color:white" title=" " :value="view_popular_outputValue" />
                </el-card>
                <el-card class="class_card" style="margin-left:20px; width: 160px; height: 260px;
                  background: linear-gradient(to top right,
                  rgb(254, 151, 153),
                  rgb(210, 8, 8));" 
                  @click="clickClassCard('Rock')"
                >
                  <p style="font-size: 14px">摇滚</p>
                  <el-divider/>
                  <p style="font-size: 12px">累计播放量</p>
                  <el-statistic value-style="color:white" title=" " :value="view_rock_outputValue" />
                </el-card>
                <el-card class="class_card" style="margin-left:20px; width: 160px; height: 260px;
                  background: linear-gradient(to top right,
                  rgb(250, 214, 143),
                  rgb(225, 131, 0));" 
                  @click="clickClassCard('Ballad')"
                >
                  <p style="font-size: 14px">民谣</p>
                  <el-divider/>
                  <p style="font-size: 12px">累计播放量</p>
                  <el-statistic value-style="color:white" title=" " :value="view_ballad_outputValue" />
                </el-card>
                <el-card class="class_card" style="margin-left:20px; width: 160px; height: 260px;
                  background: linear-gradient(to top right,
                  rgb(159, 221, 252),
                  rgb(12, 129, 196));"
                  @click="clickClassCard('Electron')"
                >
                  <p style="font-size: 14px">电子</p>
                  <el-divider/>
                  <p style="font-size: 12px">累计播放量</p>
                  <el-statistic value-style="color:white" title=" " :value="view_electron_outputValue" />
                </el-card>
              </el-row>

                <div class="container_align" style="margin-top:40px;">
                  <img src="../assets/images/icon/music_point.svg" style="width:4%" alt="" />
                  <span style="font-weight: bold; margin-left:5px">新歌发布</span>
                  <router-link :to="{name: 'List', query: {order: 'Des' }}" style="margin-left:80%">
                    <p style="font-size: 14px; color: #888">更多></p>
                  </router-link>
                </div>
                <el-divider/>

                <el-skeleton style="width: 780px" :loading="!isNewMusicsLoad" animated :count="1">
                      <template #template>
                        <div style="margin-left:20px">
                          <el-row class="container_justify" :gutter="0" v-for="(row, index) in [1, 2]">
                          <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in [1, 2, 3, 4]">
                          <el-skeleton-item variant="image" style="width: 150px; height: 150px;" />
                          <div
                            style="
                            display: flex;
                            align-items: center;
                            justify-items: space-between;
                            margin-left:0px;
                            margin-top: 14px;
                            height: 16px;
                            margin-bottom:16px"
                          >
                            <el-skeleton-item variant="text" style="width:150px" />
                          </div>
                        </el-col>
                      </el-row>
                        </div>
                      </template>
                      <template #default>
                <el-row class="container_justify" :gutter="0" v-for="(row, index) in new_rows" :key="index">
                  <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in row" :key="columnIndex">
                    <router-link :to="'/music/' + item.musicId">
                      <el-image
                        class="display_card"
                        :src="'/api/Music/Cover/' + item.musicId"
                        style="width:150px; height: 150px"
                        fit="cover">
                        <template #placeholder>
                              <el-skeleton style="width: 150px" animated :count="1">
                                <template #template>
                                  <el-skeleton-item variant="image" style="width: 150px; height: 150px" />
                                </template>
                              </el-skeleton>
                            </template>
                          </el-image>
                      <p style="margin-top: 8px; font-size: 14px;">{{item.name}}</p>
                    </router-link>
                  </el-col>
                </el-row>
              </template>
                    </el-skeleton>

                

              </el-card>
            </el-main>

            <el-aside class="main">
              <el-card class="card" style="width:280px; height: 1500px">
                <div class="container_align">
                  <img src="../assets/images/icon/music_point2.svg" style="width:14%" alt="" />
                  <span style="font-weight: bold; margin-left:5px">热门榜单</span>
                </div>
                <el-divider />

                <el-skeleton style="width: 280px" :loading="!isPopularMusicsLoad" animated :count="9">
                      <template #template>
                        <div style="margin-left:22px">
                          <el-skeleton-item variant="image" style="width: 80px; height: 80px;" />
                          <div
                            style="
                            display: flex;
                            align-items: center;
                            justify-items: space-between;
                            margin-left:92px;
                            margin-top: -66px;
                            height: 16px;
                            margin-bottom:74px"
                          >
                            <el-skeleton-item variant="text" style="width:90px" />
                            <el-skeleton-item variant="text" style="width:60px; margin-top:70px; margin-left:-90px" />
                          </div>
                        </div>
                      </template>
                      <template #default>
                <el-row :gutter="0" v-for="(item, index) in display_chart" :key="index">
                    <router-link :to="'/music/' + item.musicId" style="display: flex; align-items: center; margin-bottom:24px">
                      <p style="margin-right: 10px; font-size: 20px; font-weight: bold;">{{index + 1}}</p>
                      <el-image
                        :src="'/api/Music/Cover/' + item.musicId"
                        style="width:80px; height: 80px"
                        fit="cover">
                        <template #placeholder>
                              <el-skeleton style="width: 80px" animated :count="1">
                                <template #template>
                                  <el-skeleton-item variant="image" style="width: 80px; height: 80px" />
                                </template>
                              </el-skeleton>
                            </template>
                          </el-image>
                      <div>
                      <p style="margin-left: 10px; font-size: 14px; font-weight: bold;">{{item.name}}</p>
                      <p style="margin-left: 10px; font-size: 14px;">{{item.users[0].nickname}}</p>
                      </div>
                    </router-link>
                </el-row>
              </template>
                    </el-skeleton>
                <router-link :to="{path: '/rank'}">
                    <p style="font-size: 14px; color: #888; text-align:center">查看更多</p>
                  </router-link>
              </el-card>
            </el-aside>
          </el-container>
        </div>
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
.el-carousel__item el-image {
  margin: 0;
  justify-content: center;
  align-items: center;
}
.el-carousel__item:nth-child(n) {
  background-color: rgb(4,5,21);
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

.display_card:hover {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

.router-link-active {
  text-decoration: none;
  color: black;
}
a{
  text-decoration: none;
  color: black;
}

.class_card {
  color: rgba(255, 255, 255, 1);
  z-index: 10;
  font-family: sans-serif;
  text-align: center;
  width: 160px;
  height: 260px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(
    to top right,
    rgba(90, 149, 207, 0.5),
    rgba(58, 76, 99, 0.8)
  );
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
    -5px 5px 10px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px); /*  元素后面区域添加模糊效果 */
  border-radius: 5px;
}
.class_card:hover {
  transform: scale(1.02);
  cursor: pointer;
}
</style>
