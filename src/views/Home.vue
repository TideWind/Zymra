<script setup lang="ts">
import { ref, onMounted, computed, inject  } from "vue"
import ColorThief from 'colorthief/dist/color-thief.mjs'

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

const display_rec = ref([
  {
    src: "https://cdn.piapro.jp/thumb_i/wk/wke4xlhvfydnnvid_20191030191544_0250_0250.jpg",
    name: "糸",
    mid: "m1"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/a1/a1m3sp8gyhj0rd9n_20191030190520_0250_0250.jpg",
    name: "心臓と絡繰",
    mid: "m2"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/7x/7xoejj44vhinf86z_20191030191443_0250_0250.jpg",
    name: "魔女",
    mid: "m3"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/j8/j8o8txebob6v4nv7_20191030190730_0250_0250.jpg",
    name: "quiz",
    mid: "m4"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/an/anwubj2862wrdt41_20191030191118_0250_0250.jpg",
    name: "そして花になる",
    mid: "m5"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg",
    name: "過去を喰らう",
    mid: "m6"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/d4/d4ukt2vj57ujiafj_20191030190947_0250_0250.jpg",
    name: "夜が降り止む前に",
    mid: "m7"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/ve/vexeeei0exa99y9y_20191030191733_0250_0250.jpg",
    name: "夜行バスにて",
    mid: "m8"
  },
]);

const display_new = ref([
  {
    src: "https://cdn.piapro.jp/thumb_i/n3/n3z67w80hm3rjkra_20230711171834_0250_0250.png",
    name: "例えば",
    mid: "m28"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/c4/c4yijyktluire9br_20230711163237_0250_0250.jpg",
    name: "邂逅",
    mid: "m27"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/1w/1won9lnrxu4t1pgx_20230711162719_0250_0250.png",
    name: "人を気取る",
    mid: "m26"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/km/kmn8ipvklym6summ_20230711161705_0250_0250.jpg",
    name: "それを世界と言うんだね",
    mid: "m25"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/o4/o4rll8mdgp734z3b_20211030142734_0250_0250.jpg",
    name: "世惑い子",
    mid: "m24"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/1a/1akgnvbup907vpiw_20211030141910_0250_0250.jpg",
    name: "海に化ける",
    mid: "m23"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/s3/s3qysryru3v665ze_20201204190046_0250_0250.jpg",
    name: "彷徨い",
    mid: "m22"
  },
  {
    src: "https://cdn.piapro.jp/thumb_i/ia/iaayaniv0cgpv25g_20201204185937_0250_0250.png",
    name: "畢生よ",
    mid: "m21"
  },
]);

// const display_chart = ref([
//   {
//     src: "https://cdn.piapro.jp/thumb_i/wk/wke4xlhvfydnnvid_20191030191544_0250_0250.jpg",
//     name: "糸",
//     vocal:"花譜",
//     mid: "m1"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/a1/a1m3sp8gyhj0rd9n_20191030190520_0250_0250.jpg",
//     name: "心臓と絡繰",
//     vocal:"花譜",
//     mid: "m2"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/7x/7xoejj44vhinf86z_20191030191443_0250_0250.jpg",
//     name: "魔女",
//     vocal:"花譜",
//     mid: "m3"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/j8/j8o8txebob6v4nv7_20191030190730_0250_0250.jpg",
//     name: "quiz",
//     vocal:"花譜",
//     mid: "m4"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/an/anwubj2862wrdt41_20191030191118_0250_0250.jpg",
//     name: "そして花になる",
//     vocal:"花譜",
//     mid: "m5"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg",
//     name: "過去を喰らう",
//     vocal:"花譜",
//     mid: "m6"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/d4/d4ukt2vj57ujiafj_20191030190947_0250_0250.jpg",
//     name: "夜が降り止む前に",
//     vocal:"花譜",
//     mid: "m7"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/ve/vexeeei0exa99y9y_20191030191733_0250_0250.jpg",
//     name: "夜行バスにて",
//     vocal:"花譜",
//     mid: "m8"
//   },
//   {
//     src: "https://cdn.piapro.jp/thumb_i/uf/uf9a8v5e19pn23ia_20191030191300_0250_0250.jpg",
//     name: "忘れてしまえ",
//     vocal:"花譜",
//     mid: "m9"
//   },
// ]);

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
const clickClassCard = (tag:string) => {
      console.log(tag);
      router.push({name: 'List', params: {tag: tag }});
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
              view_popular.value = view_popular_num;
              view_rock.value = view_rock_num;
              view_ballad.value = view_ballad_num;
              view_electron.value = view_electron_num;
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
              view_popular.value = view_popular_num;
              view_rock.value = view_rock_num;
              view_ballad.value = view_ballad_num;
              view_electron.value = view_electron_num;
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

const view_popular_num = 964207;
const view_rock_num = 872349;
const view_ballad_num = 530816;
const view_electron_num = 215678;


import { useTransition } from '@vueuse/core'
const view_popular = ref(0);
const view_rock = ref(0);
const view_ballad = ref(0);
const view_electron = ref(0);

view_popular.value = view_popular_num;
view_rock.value = view_rock_num;
view_ballad.value = view_ballad_num;
view_electron.value = view_electron_num;

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

const axios = inject('$axios')
const response = await axios.get('/api/Music')
var display_chart = response.data;
//console.log(display_chart);


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
                <el-row class="container_justify" :gutter="0" v-for="(row, index) in explore_rows" :key="index">
                  <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in row" :key="columnIndex">
                    <router-link :to="'/music/' + item.mid">
                      <el-image
                        class="display_card"
                        :src="getImagesSrc(item.src)"
                        style="width:150px; height: 150px"
                        fit="cover"
                      />
                      <p style="margin-top: 8px; font-size: 14px;">{{item.name}}</p>
                    </router-link>
                  </el-col>
                </el-row>

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
                  @click="clickClassCard('popular')"
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
                  @click="clickClassCard('rock')"
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
                  @click="clickClassCard('ballad')"
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
                  @click="clickClassCard('electron')"
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
                  <router-link :to="{path: '/list', params: {order: 'time_des' }}" style="margin-left:80%">
                    <p style="font-size: 14px; color: #888">更多></p>
                  </router-link>
                </div>
                <el-divider/>
                <el-row class="container_justify" :gutter="0" v-for="(row, index) in new_rows" :key="index">
                  <el-col :span="6" style="text-align: center; margin-bottom:10px;" v-for="(item, columnIndex) in row" :key="columnIndex">
                    <router-link :to="'/music/' + item.mid">
                      <el-image
                        class="display_card"
                        :src="getImagesSrc(item.src)"
                        style="width:150px; height: 150px"
                        fit="cover"
                      />
                      <p style="margin-top: 8px; font-size: 14px;">{{item.name}}</p>
                    </router-link>
                  </el-col>
                </el-row>

                

              </el-card>
            </el-main>

            <el-aside class="main">
              <el-card class="card" style="width:280px; height: 1500px">
                <div class="container_align">
                  <img src="../assets/images/icon/music_point2.svg" style="width:14%" alt="" />
                  <span style="font-weight: bold; margin-left:5px">热门榜单</span>
                </div>
                <el-divider />
                <el-row :gutter="0" v-for="(item, index) in display_chart" :key="index">
                    <router-link :to="'/music/' + item.mid" style="display: flex; align-items: center; margin-bottom:24px">
                      <p style="margin-right: 10px; font-size: 20px; font-weight: bold;">{{index + 1}}</p>
                      <el-image
                        :src="getImagesSrc(item.src)"
                        style="width:80px; height: 80px"
                        fit="cover"
                      />
                      <div>
                      <p style="margin-left: 10px; font-size: 14px; font-weight: bold;">{{item.name}}</p>
                      <p style="margin-left: 10px; font-size: 14px;">{{item.vocal}}</p>
                      </div>
                    </router-link>
                </el-row>
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
