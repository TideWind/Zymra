<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive } from "vue"
import { useRouter } from "vue-router";
import store from '../store/index.ts';

import upload_icon from '../assets/images/icon/upload_icon.vue'
import data_icon from '../assets/images/icon/data_icon.vue'

import { Plus, Edit, UploadFilled } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const router = useRouter();

onMounted(() =>{

})

import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  album:'',
  type:'',
  tags:'',
  lyric: '',
  cover:null,
})

const tagTyping = ref("")

const onSubmit = () => {
  console.log('submit!')
}

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px; height: 1080px">

      <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 60px">

        <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽到此处也可上传
          </div>
          <div class="container_justify">
            <el-button style="width:140px; margin-top:20px; margin-bottom:30px" type="primary">上传音频</el-button>
          </div>
        </el-upload>

        <el-form-item style="margin-top:40px" label="音乐封面">
        <el-card style="width: 240px; height: 240px; --el-card-padding: 4px;" shadow="never">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="handleFileUpload"
            @mouseenter="showIcon = true" @mouseleave="showIcon = false"
          >
            <el-image style="width: 172px; height: 172px;" v-if="form.cover" :src="form.cover" class="avatar" :fit="cover" />
            <el-icon v-if="form.cover" style="position:absolute;" class="avatar-edit-icon"><Edit /></el-icon>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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
          <el-input style="width:460px" v-model="tagTyping" />
          <el-button style="margin-top:-60px; margin-left:470px; z-index:999">添加</el-button>
          <p>{{ form.tags }}</p>
        </el-form-item>

        <el-form-item label="音乐歌词">
          <el-input v-model="form.lyric" type="textarea" />
        </el-form-item>
  
      </el-form>

      <div class="container_justify">
        <el-button style="width:100px; margin-top:20px" type="primary" @click="onSubmit">投稿</el-button>
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

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 230px;
  height: 230px;
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
