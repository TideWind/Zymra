<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
import store from '../store/index.ts';
import { Picture as IconPicture } from '@element-plus/icons-vue'

import music_play_icon from '../assets/images/icon/music_play_icon.vue'
import music_pause_icon from '../assets/images/icon/music_pause_icon.vue'
import music_back_icon from '../assets/images/icon/music_back_icon.vue'
import music_forward_icon from '../assets/images/icon/music_forward_icon.vue'
import like_icon from '../assets/images/icon/like_icon.vue'
import download_icon from '../assets/images/icon/download_icon.vue'

const router = useRouter();

defineProps({
    music_id: String
})

onMounted(() =>{

})

const { proxy } = getCurrentInstance()
const src = "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg"

const record = ref()

let play_icon = ref(music_play_icon)
const isOnPlay = ref(false)

const musicAudio = ref();
const musicSource = ref('**https://zymra-1300854668.cos.ap-beijing.myqcloud.com/「過去を喰らう」offvo_virtual_kaf_202403170031.mp3');

const onBtnPlayClicked = () => {
  if(isOnPlay.value == false)
  {
    play_icon.value = music_pause_icon
    isOnPlay.value = true
    musicAudio.value.play()
    document.querySelector('.record').style.animationPlayState = 'running'
  }
  else
  {
    play_icon.value = music_play_icon
    isOnPlay.value = false
    musicAudio.value.pause()
    document.querySelector('.record').style.animationPlayState = 'paused'
  }
}

const isLike = ref(false)

const onBtnLickClicked = () => {
  if(isLike.value == false)
    isLike.value = true
  else
    isLike.value = false
}

const playTime = ref(0.00);
const sliderLength = ref(100.00)


const tooltipFormat = () => {
  let strTime = playTime.value
  let strMinute = parseInt(strTime / 60 + '')
  let strSecond = parseInt(strTime % 60 + '')
  return strMinute.toString().padStart(2, '0') + ":" + strSecond.toString().padStart(2, '0')
}

const musicInfo = ref({
  music_id : '123',
  music_name : '過去を喰らう',
  music_audio : '',
  music_cover : '',
  music_class : '流行',
  music_length : 241,
  music_album : '不可解',
  music_authors : [
    '花譜',
    '黑柿子'
  ],
  music_lyric :'愛した理由も忘れちゃって　過食気味の胸で泣いちゃって\n肌の色すら 見えなくなっている\n自分だけ傷づいたつもりで　悪いのは誰かだと思って\n足が抜け落ちたのも　気づかない\n夢や希望はなんだった？　やりたいことはこれだった？\n過去が僕らを待っている　貪欲な顔で待っている\n侘しさも　悲しみもなければ\n夜が死ぬたび　歌なんて歌わなかった\nあなたの笑顔がここにあるなら　諦めなんてしなかったんだ\nあなたの言葉を思い出すから　慰めなんていらなかった\n生きる意味ばかり思い出すから　優しさを常に疑った\nあなたの涙を見て笑えたら　今更恥など知らなかった\nウグイスが鳴いて　破り捨てた卒業証書が\n夜空になって舞ってった　過去を喰らい尽くした\n反抗期だと疎まれた子供たちは復讐に走り\n意味にすがる腑抜けた大人たちは歌を歌いたがる\n若さを強いて貪る惰眠　気づけば爪が剥がれ落ちる\n雨が好きだった理由も　好きな歌も忘れ去った\n心に響くのは物ばかり　それなのに人が恋しくって\nあなたへの気持ちだけ　今も終わらないんだ\n例えば僕らが街で出会って　夢のような話を紡げたら\nあなたと僕は笑えるだろうか\n画面の中であなたに会えたら　思い出すのは後悔ばかりだ\n今でも愛しいよ　あの頃に今も戻りたいよ\nこんな大人で我慢できたら　苦しみなんて知らなかった\n言葉ですべて解決するなら　ここまで涙は出なかった\nあなたが頭で渦を巻くから　今もこの朝が嫌いだった\n大人になるのが怖かった　強くなることが怖かった\nウグイスが鳴いて　ゴミになった制服が\n夜空になって舞ってった　過去を喰らい尽くした'
})

</script>

<template>
          <el-container style="display: grid; place-items: center;">
              <el-card class="card" style="width:1080px">
                <div style="display:flex">
                      <div style="display:inline-block;">
                        <el-avatar ref="record" :class="{record}" :size="300" :src="src" style="margin-left:100px; margin-top:120px" />
                      </div>

                      <div style="display:inline-block; margin-top:60px; margin-left: 100px;">
                        <p style="font-weight: bold; font-size:26px">{{ musicInfo.music_name }}</p>

                        <p style="margin-top: -20px">
                          <span style="font-size:16px; color: #888">专辑：{{ musicInfo.music_album }}</span>
                          <span style="font-size:16px; margin-left:20px; color: #888">作者：</span>
                          <span v-for="(item, index) in musicInfo.music_authors" :key="index">
                            <span v-if="index != 0" style="font-size:16px; color: #888"> / </span>
                            <span style="font-size:16px; color: #888">{{ item }}</span>
                          </span>
                        </p>
                        <el-scrollbar height="300px" style="margin-bottom:90px; margin-top:10px">
                          <div style="whiteSpace: pre-wrap; line-height:40px">
                            <p style="font-size:16px; margin-right:100">{{ musicInfo.music_lyric }}</p>
                          </div>
                        </el-scrollbar>
                      </div>

                      <audio ref="musicAudio" class="audio-component" :src=musicSource controls preload="auto" @canplay="changeDuration" />
                </div>
              </el-card>

              <footer class="playbar">
                <div style="display: flex; justify-content: center">
                  <el-slider v-model="playTime" :format-tooltip="tooltipFormat" size="small" :max="sliderLength" style="width:1520px;" @change="changePlayTime"/>
                </div>
                <el-card class="card" style="margin-top:-10px;width:1520px; height: 80px; display: flex; justify-content: center;">
                  <el-button @click="onBtnLickClicked" :class="{liked:isLike}" :icon="like_icon" color="#ea9800" size="large" text plain />
                  <el-button :icon="music_back_icon" color="#ea9800" size="large" text plain />
                  <el-button @click="onBtnPlayClicked" :icon="play_icon" color="#ea9800" size="large" circle plain />
                  <el-button :icon="music_forward_icon" color="#ea9800" size="large" text plain />
                  <el-button :icon="download_icon" color="#ea9800" size="large" text plain />

                </el-card>
              </footer>
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

.record {
  animation: rotate-animation 30s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate-animation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); } 
}

.playbar{
  position:fixed;bottom:0;z-index:999;
}

.liked{
  --el-button-text-color: rgb(255, 57, 57) !important;
}

.el-slider {
    --el-slider-main-bg-color:  #ea9800 !important;
}

.audio-component {
  display: none;
}

</style>