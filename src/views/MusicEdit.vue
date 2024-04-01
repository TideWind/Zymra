<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive } from "vue"

import { Plus, Edit, UploadFilled } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import { ElMessage, ElLoading } from 'element-plus'

import SubmitSuccess from "../components/SubmitSuccess.vue"

const props = defineProps({
  music_id: String
})

onMounted(() =>{
  getMusicInfo()
})

const audioUpload = ref()
const coverUpload = ref()

const form = ref({
  name: '',
  album:'',
  type:'',
  tags:[
  ],
  lyric: '',
  cover: null,
  audio: null
})

let getMusicInfo = async () => {
  let res = await proxy.$api.getMusicInfo(props.music_id)
  if (res.status == 200) {
    form.value.name = res.data.name
    form.value.album = res.data.album
    form.value.lyric = res.data.lyric
    switch (res.data.class)
    {
      case 0 : form.value.type = "popular"; break;
      case 1 : form.value.type = "rock"; break;
      case 2 : form.value.type = "ballad"; break;
      case 3 : form.value.type = "electron"; break;
    }
    form.value.tags = res.data.musicTags.map(item => item.tag)
    console.log(form.value.tags)
  }
}

const tagTyping = ref<string>('')

const showIcon = ref(false)

const onAddTag = () => {
  
  if(/^\s*$/.test(tagTyping.value))
  {
    ElMessage({message: '请输入标签！', type: 'error',})
  }
  else if(form.value.tags.length >= 10)
  {
    ElMessage({message: '标签数量不能超过10个！', type: 'error',})
  }
  else if(form.value.tags.indexOf(tagTyping.value) != -1)
  {
    ElMessage({message: '标签不能重复！', type: 'error',})
  }
  else
  {
    form.value.tags.push(tagTyping.value.trim())
    tagTyping.value = ''
  }
}

const onDeleteTag = (tag:string) =>{
  form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}

const isSubmit = ref(false)
const isSubmitSuccess = ref(false)

const { proxy } = getCurrentInstance()

let uploadMusic = async () => {

  
  audioUpload.value!.submit()
  coverUpload.value!.submit()

  for (const key in form.value) {
    if (form.value.hasOwnProperty(key)) {
      const value = form.value[key];
      if(key == "audio" || key == "cover")
        break
      if (value == '' || value == null) {
        console.log(value, key)
        ElMessage({message: '请将信息填写完整！', type: 'error',})
        return false
      }
    }
  }

  isSubmit.value = true

  const formData = new FormData();
  formData.append('music_id', props.music_id)

  if(form.value.audio != null && filelist.length != 0)
  {
    formData.append('audio', form.value.audio)
    const duration:number = await getAudioDuration(form.value.audio);
    let length_minute = parseInt(duration / 60 + '')
    let length_second = parseInt(duration % 60 + '')
    formData.append('length_minute', length_minute)
    formData.append('length_second', length_second)
  }
  else
  {
    formData.append('audio', null)
    formData.append('length_minute', null)
    formData.append('length_second', null)
  }
  
  if(form.value.cover != null)
    formData.append('cover', form.value.cover)
  else
    formData.append('cover', null)

  formData.append('name', form.value.name)
  formData.append('album', form.value.album)
  formData.append('type', form.value.type)

  for(const tag of form.value.tags)
  {
    formData.append('tags', tag)
  }
  formData.append('lyric', form.value.lyric)
  //console.log(formData.get('audio'))

  //const loadingInstance = ElLoading.service({ fullscreen: true, text: '上传中...' });

    try {
        let res = await proxy.$api.editMusic(formData);
        //console.log(res.status)
        //console.log(res)
        if (res.status == 200) {
            ElMessage({ message: '修改成功！请等待审核！', type: 'success' });
            isSubmitSuccess.value = true
        }
    } catch (error) {
        console.error('上传失败：', error);
        
        // 处理上传失败的情况
    }
     finally {
        //loadingInstance.close();
        isSubmit.value = false
    }
}

const onSubmit = () => {
  uploadMusic()
  //console.log(form.value)
}

const getAudioDuration = (rawFile) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(rawFile)

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src); // 释放资源
      resolve(audio.duration);
    };

    audio.onerror = (error) => {
      reject(error);
    };
  });
};

const beforeAudioUpload = async (rawFile) =>{
  form.value.audio = rawFile
  return false
}

const beforeCoverUpload = (rawFile) =>{
  form.value.cover = rawFile
  return false
}

const audioOnChange = (uploadFile, uploadFiles) => {
  if (!(uploadFile.raw.type == 'audio/mpeg' || uploadFile.raw.type == 'audio/wav')) {
    ElMessage.error('音频只能上传 MP3/WAV 格式!')
    audioUpload.value!.clearFiles()
    return false
  } else if (uploadFile.raw.size / 1024 / 1024 > 128) {
    ElMessage.error('音频大小不能超过 128MB!')
    audioUpload.value!.clearFiles()
    return false
  }
  //console.log(uploadFile)
  //form.value.audio = uploadFile.raw
}

const coverSrc = ref(null)
const rawCoverSrc = ref('/api/Music/Cover/' + props.music_id + '?' + new Date().getTime())

const coverOnChange = (uploadFile, uploadFiles) => {
  if (!(uploadFile.raw.type == 'image/jpeg' || uploadFile.raw.type == 'image/png')) {
    ElMessage.error('封面只能上传 JPG/PNG 格式!')
    coverUpload.value!.clearFiles()
    return false
  } else if (uploadFile.raw.size / 1024 / 1024 > 10) {
    ElMessage.error('封面大小不能超过 10MB!')
    coverUpload.value!.clearFiles()
    return false
  }
  //console.log(uploadFile)
  form.value.cover = uploadFile.raw
  coverSrc.value = URL.createObjectURL(uploadFile.raw)
}

const filelist = ref([])

</script>

<template>
  <SubmitSuccess v-if="isSubmitSuccess" />
  <el-container v-else>
    <el-card class="card" style="width:1080px;">

      <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 60px">

        <el-upload
          ref="audioUpload"
          class="upload-demo"
          drag
          :before-upload="beforeAudioUpload"
          :http-request="handleAudioUpload"
          :auto-upload="false"
          :limit="1"
          :on-change="(uploadFile,uploadFiles) => audioOnChange(uploadFile,uploadFiles)"
          :file-list="filelist"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽到此处也可上传
          </div>
          <div class="container_justify">
            <el-button style="width:140px; margin-top:20px; margin-bottom:30px" color="#FFA500" plain>重新上传音频</el-button>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              如果音频内容没有更改，则无需重新上传
            </div>
          </template>
        </el-upload>

        <el-form-item style="margin-top:40px" label="音乐封面">
        <el-card style="width: 240px; height: 240px; --el-card-padding: 4px;" shadow="never">
          <el-upload
            ref="coverUpload"
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
            :http-request="handleCoverUpload"
            :auto-upload="false"
            :on-change="(uploadFile,uploadFiles) => coverOnChange(uploadFile,uploadFiles)"
            @mouseenter="showIcon = true" @mouseleave="showIcon = false"
          >
            <el-image v-if="coverSrc" style="width: 232px; height: 232px;" :src="coverSrc" class="avatar" :fit="cover" />
            <el-image v-else style="width: 232px; height: 232px;" :src="rawCoverSrc" class="avatar" :fit="cover" />
            <el-icon v-if="showIcon" style="position:absolute;" class="avatar-edit-icon"><Edit /></el-icon>
          </el-upload>
        </el-card>
        </el-form-item>

        <el-form-item label="音乐名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="音乐专辑">
          <el-input v-model="form.album" />
        </el-form-item>

        <el-form-item label="音乐种类">
          <el-select v-model="form.type" placeholder="请选择音乐种类">
            <el-option label="流行" value="popular" />
            <el-option label="摇滚" value="rock" />
            <el-option label="民谣" value="ballad" />
            <el-option label="电子" value="electron" />
          </el-select>
        </el-form-item>

        <el-form-item label="音乐标签">
          <div style="margin-bottom:-26px; ">
            <el-input style="width:460px" v-model="tagTyping" />
            <el-button @click="onAddTag" style="margin-top:-67px; margin-left:472px; z-index:999; --el-color-primary:#ffd04b" plain>添加</el-button>
          </div>
          <span v-for="(item, index) in form.tags" :key="item" style="display: inline-block; margin-top:10px; margin-right:10px">
            <el-alert @close="onDeleteTag(item)" :title="item" type="info" style="padding-right:40px;" />
          </span>
        </el-form-item>

        <el-form-item label="音乐歌词">
          <el-input v-model="form.lyric" type="textarea" />
        </el-form-item>
  
      </el-form>

      <div class="container_justify">
        <el-button color="#FFA500" :loading="isSubmit" style="width:100px; margin-top:20px; margin-bottom:60px" @click="onSubmit" plain>重新投稿</el-button>
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

.avatar-uploader .avatar {
  width: 230px;
  height: 230px;
  display: block;
}

.el-input{
    --el-input-focus-border-color: #ffd04b;
}

.el-textarea {
    --el-input-focus-border-color: #ffd04b;
}

.el-select {
  --el-color-primary: #ffd04b !important;
}

.el-select-dropdown__item.is-selected {
    color: #FFA500;
}
</style>

<style>
.avatar-uploader .el-upload {
  /* border: 1px dashed var(--el-border-color); */
  /* border-radius: 6px; */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 230px !important;
  height: 230px !important;
  text-align: center;
}

.avatar-edit-icon{
  font-size: 28px;
  color: #000000;
  width: 230px;
  height: 230px;
  text-align: center;
}

.avatar-edit-icon:hover{
  z-index:10;
}

.el-upload-dragger {
  border: 2px dashed var(--el-border-color) !important;
}
</style>
