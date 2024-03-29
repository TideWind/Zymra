<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
import store from '../store/index.ts';
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'

import music_play_icon from '../assets/images/icon/music_play_icon.vue'
import music_pause_icon from '../assets/images/icon/music_pause_icon.vue'
import music_back_icon from '../assets/images/icon/music_back_icon.vue'
import music_forward_icon from '../assets/images/icon/music_forward_icon.vue'
import like_icon from '../assets/images/icon/like_icon.vue'
import download_icon from '../assets/images/icon/download_icon.vue'
import volume_on_icon from '../assets/images/icon/volume_on_icon.vue'
import volume_mute_icon from '../assets/images/icon/volume_mute_icon.vue'

import record_img from '../assets/images/record.svg'

const router = useRouter();

const props = defineProps({
    music_id: String
})

const intervalId = ref();

onMounted(() =>{
  intervalId.value = setInterval(updatePlayTimePerTime, 1)
  getMusicInfo();
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

const { proxy } = getCurrentInstance()
const coverSrc = "https://cdn.piapro.jp/thumb_i/rh/rh3mcwiuc81bimfm_20191030190256_0250_0250.jpg"

const record = ref()
const record_bg = ref()

let play_icon = ref(music_play_icon)
let volume_icon = ref(volume_on_icon)

const isCanPlay = ref(false)

const isOnPlay = ref(false)
const isLike = ref(false)
const isMute = ref(false)

const musicAudio = ref();
const musicSource = ref('/banner/「過去を喰らう」offvo_virtual_kaf_202403170031.mp3');

const playTime = ref(0.00);
const sliderLength = ref(100.00)

const voicePower = ref(0.5);

const canPlay = () => {
  isCanPlay.value = true
  sliderLength.value = musicAudio.value.duration
  musicAudio.value.volume = voicePower.value
}

const onBtnPlayClicked = () => {
  if(isOnPlay.value == false)
  {
    play_icon.value = music_pause_icon
    isOnPlay.value = true
    musicAudio.value.play()
    document.querySelector('.record').style.animationPlayState = 'running'
    document.querySelector('.record_bg').style.animationPlayState = 'running'
  }
  else
  {
    play_icon.value = music_play_icon
    isOnPlay.value = false
    musicAudio.value.pause()
    document.querySelector('.record').style.animationPlayState = 'paused'
    document.querySelector('.record_bg').style.animationPlayState = 'paused'
  }
}

const updatePlayTimePerTime = () => {
  if (isOnPlay.value && !isChangingPlayTime.value) {
    playTime.value = musicAudio?.value.currentTime

    if (playTime.value >= sliderLength.value) {
      playTime.value = 0
      play_icon.value = music_play_icon
      isOnPlay.value = false
      document.querySelector('.record').style.animationPlayState = 'paused'
      document.querySelector('.record').getAnimations()[0].currentTime = 0
      document.querySelector('.record_bg').style.animationPlayState = 'paused'
      document.querySelector('.record_bg').getAnimations()[0].currentTime = 0
    }
  }
}

const isChangingPlayTime = ref(false)

const changePlayTime = (val) => {
  musicAudio.value.currentTime = val
  isChangingPlayTime.value = false
}

const inputPlayTime = () => {
  isChangingPlayTime.value = true
}

const onBtnLickClicked = () => {
  
  if(isLike.value == false)
    isLike.value = true
  else
    isLike.value = false
}

const onBtnVolumeClicked = () => {
  if(isMute.value == false)
  {
    isMute.value = true
    musicAudio.value.volume = 0
    volume_icon.value = volume_mute_icon
  }
  else
  {
    isMute.value = false
    musicAudio.value.volume = voicePower.value
    volume_icon.value = volume_on_icon
  }
}

const inputVoicePower = (val) => {
  musicAudio.value.volume = val
  if (val > 0) {
    volume_icon.value = volume_on_icon
    isMute.value = false
  } else {
    volume_icon.value = volume_mute_icon
    isMute.value = true
  }
}

const isHideBar = ref(false)
const onBtnHideClicked = () => {
  isHideBar.value = true
}

const onBtnShowClicked = () => {
  isHideBar.value = false
}

const tooltipFormat = () => {
  let strTime = playTime.value
  let strMinute = parseInt(strTime / 60 + '')
  let strSecond = parseInt(strTime % 60 + '')
  return strMinute.toString().padStart(2, '0') + ":" + strSecond.toString().padStart(2, '0')
}

const timeFormat = (length:number) =>
{
  let strTime = length
  let strMinute = parseInt(strTime / 60 + '')
  let strSecond = parseInt(strTime % 60 + '')
  return strMinute.toString().padStart(2, '0') + ":" + strSecond.toString().padStart(2, '0')
}

const musicInfo = ref({
  music_name : '',
  music_audio : '',
  music_cover : '',
  music_length : 0,
  music_album : '',
  music_authors : [],
  music_authors_id : [],
  music_lyric :''
})

let getMusicInfo = async () => {
  let res = await proxy.$api.getMusicInfo(props.music_id)
  if (res.status == 200) {
    musicInfo.value.music_name = res.data.name
    musicInfo.value.music_album = res.data.album
    musicInfo.value.music_authors.push(...res.data.users.map(item => item.nickname))
    musicInfo.value.music_authors_id.push(...res.data.users.map(item => item.username))
    musicInfo.value.music_lyric = res.data.lyric
    const [hours, minutes, seconds] = res.data.length.split(':').map(Number);
    musicInfo.value.music_length = minutes * 60 + seconds
    sliderLength.value = musicInfo.value.music_length

    console.log(musicInfo.value.music_length)
  }
}

</script>

<template>
            <el-container style="display: grid; place-items: center;">
              <el-card class="card" style="width:1080px">
                <div style="display:flex">

                      <div style="display:inline-block" >
                        <el-image ref="record_bg" :class="{record_bg}" style="margin-left:300px; margin-top:170px; width: 370px; height: 370px" src="/banner/record.svg" :fit="fit" />
                        <el-avatar ref="record" :class="{record}" style="margin-left:365px; margin-top:235px" :size="240" :src="'/api/Music/Cover/' + music_id" />
                      </div>

                      <div style="display:inline-block; margin-top:60px; margin-left: 500px;">
                        <p style="font-weight: bold; font-size:26px">{{ musicInfo.music_name }}</p>

                        <p style="margin-top: -20px">
                          <span style="font-size:16px; color: #888">专辑：{{ musicInfo.music_album }}</span>
                          <span style="font-size:16px; margin-left:20px; color: #888">作者：</span>
                          <span v-for="(item, index) in musicInfo.music_authors" :key="index">
                            <span v-if="index != 0" style="font-size:16px; color: #888"> / </span>
                            <router-link :to="'/user/' + musicInfo.music_authors_id[index]">
                              <span style="font-size:16px; color: #888">{{ item }}</span>
                            </router-link>
                          </span>
                        </p>
                        <el-scrollbar height="300px" style="margin-bottom:90px; margin-top:10px">
                          <div style="whiteSpace: pre-wrap; line-height:40px">
                            <p style="font-size:16px; margin-right:100">{{ musicInfo.music_lyric }}</p>
                          </div>
                        </el-scrollbar>
                      </div>

                      <audio ref="musicAudio" class="audio-component" :src="'/api/Music/Audio/' + music_id" controls preload="auto" @canplay="canPlay" />
                </div>
              </el-card>

              <el-button @click="onBtnShowClicked" :icon="ArrowUpBold" class="btnShow" color="#ea9800" size="large" style="font-size: 20px; margin-left:1435px" text plain />

              <footer :class="{playbar:!isHideBar, hideBar:isHideBar}" style="width:100%">

                <div style="width:100%; display: flex; justify-content: center">
                  <el-slider v-model="playTime" class="progress" :format-tooltip="tooltipFormat" size="small" :max="sliderLength" @change="changePlayTime" @input="inputPlayTime"/>
                </div>

                <el-card class="card" style="margin-top:-10px; width:100%; height: 80px; display: flex; justify-content: center;">

                  <span style="display:inline-block; width:200px; font-size:12px; color: #888; margin-right:380px">
                      {{ timeFormat(playTime) }} / {{ timeFormat(sliderLength) }}
                  </span>

                  <el-button @click="onBtnLickClicked" :class="{liked:isLike, btn:!isLike}" :icon="like_icon" color="#ea9800" size="large" style="font-size: 20px;" text plain />
                  <el-button :icon="music_back_icon" class="btn" color="#ea9800" size="large" style="font-size: 20px;" text plain />
                  <el-button @click="onBtnPlayClicked" :loading="!isCanPlay" class="btn" :icon="play_icon" color="#ea9800" size="large" style="font-size: 20px;" circle plain />
                  <el-button :icon="music_forward_icon" class="btn" color="#ea9800" size="large" style="font-size: 20px;" text plain />
                  <a :href="'/api/Music/Audio/' + music_id" :download="musicInfo.music_name + '.mp3'">
                    <el-button :icon="download_icon" class="btn" color="#ea9800" size="large" style="font-size: 20px;" text plain />
                  </a> 

                  <span style="display:inline-block; width:160px; margin-left:380px; margin-top:-50px">
                    <el-button @click="onBtnVolumeClicked" class="btn" :icon="volume_icon" color="#ea9800" size="large" style="margin-bottom:-49px; margin-left:10px; font-size: 20px;" text plain />
                    <span>
                      <el-slider v-model="voicePower" :max="1" :step="0.01" @input="inputVoicePower" class="volume" style="width:90px; margin-left:60px" :show-tooltip="false" />
                    </span>
                  </span>

                  <span style="display:inline-block; width:40px; font-size:12px; color: #888; margin-left:1200px; margin-top:-50px">
                    <el-button @click="onBtnHideClicked" :icon="ArrowDownBold" class="btn" color="#ea9800" size="large" style="font-size: 20px; margin-left:235px; margin-top:-70px" text plain />
                  </span>
                    
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

.record,
.record_bg{
  position:absolute;
  top: 0;
  left: 0;
  animation: rotate-animation 30s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate-animation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); } 
}

.playbar{
  position:fixed;
  bottom:0;
  z-index:999;
  transition: bottom 0.3s ease-in-out;
}

.btn{
  --el-fill-color-light: transparent !important;
  --el-fill-color: transparent !important;
}

.btn:hover{
  --el-button-text-color: #f9ad22 !important;
}

.liked{
  --el-button-text-color: rgb(255, 57, 57) !important;
  --el-fill-color-light: transparent !important;
  --el-fill-color: transparent !important;
}

.liked:hover{
  --el-button-text-color: rgb(225, 28, 28) !important;
}

.el-slider {
  --el-slider-main-bg-color:  #ea9800 !important;
}

.progress{
  --el-slider-button-size: 14px !important;
}

.volume{
  --el-slider-button-size: 12px !important;
}

.hideBar{
  position: fixed;
  bottom:-82px;
  transition: bottom 0.3s ease-in-out;
}

.btnShow{
  position:fixed;
  bottom:0;
  z-index:900;
}

.audio-component {
  display:none;
}

</style>