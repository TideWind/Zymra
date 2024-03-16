<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive } from "vue"
import { useRouter } from "vue-router";
import store from '../store/index.ts';

const router = useRouter();

onMounted(() =>{
  getSelfUserAvatar()
  getSelfUserInfo()
})

import { ElMessage } from 'element-plus'
import { Plus, Edit } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const userInfo = ref({
  userAvatar : '',
  userNickname : '',
  userName : '',
  userDescribe : '',
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  userInfo.value.userAvatar = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png')) {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const { proxy } = getCurrentInstance()

let handleFileUpload = async (rawFile) => {
  const formData = new FormData();
  formData.append('file', rawFile.file);
  //console.log(rawFile.file)
  let res = await proxy.$api.uploadAvatar(formData)
  if (res.status == 200) {
    ElMessage({message: '头像已上传！', type: 'success',})
  } 
}

let getSelfUserAvatar = async () => {
  let res = await proxy.$api.getSelfAvatar()
  if (res.status == 200) {
    const file = new File([res.data], 'avatar.jpg', { type: res.headers['content-type'] });
    userInfo.value.userAvatar = URL.createObjectURL(file)
  }
}

let getSelfUserInfo = async () => {
  let res = await proxy.$api.getSelfUserInfo()
  //console.log(res)
  if (res.status == 200) {
    userInfo.value.userNickname = res.data.nickname
    userInfo.value.userName = res.data.username
    userInfo.value.userDescribe = res.data.describe
  }
}

let uploadUserInfo = async () => {
  const form = reactive({
    nickname: userInfo.value.userNickname,
    describe: userInfo.value.userDescribe
  })
  console.log(form)
  let res = await proxy.$api.uploadUserInfo(form)
  if (res.status == 200) {
    ElMessage({message: '个人资料已保存！', type: 'success',})
    router.push({path: '/user'});
  } 
}

const showIcon = ref(false);

</script>

<template>
          <el-container style="display: grid; place-items: center;">
              <el-card class="card" style="width:1080px; height: 620px">

                  <el-row style="margin-top: 30px; margin-bottom:40px;">
                    <el-card style="width: 180px; height: 180px; margin-left: 40px; --el-card-padding: 4px;" shadow="never">

                      <!-- <el-image  :src="url" :fit="cover" /> -->
                      <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :http-request="handleFileUpload"
                        @mouseenter="showIcon = true" @mouseleave="showIcon = false"
                      >
                        <el-image style="width: 172px; height: 172px;" v-if="userInfo.userAvatar" :src="userInfo.userAvatar" class="avatar" :fit="cover" />
                        <el-icon v-if="showIcon && userInfo.userAvatar" style="position:absolute;" class="avatar-edit-icon"><Edit /></el-icon>
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        
                      </el-upload>

                    </el-card>
                    <div>

                      <div style="margin-left:654px; margin-top:34px">
                        <el-button @click="uploadUserInfo" color="#FFA500" style="" plain >保存个人资料</el-button>
                      </div>

                      <div style="display:inline-block; margin-top:-70px;">
                        <el-input v-model="userInfo.userNickname" style="margin-top:4px; margin-left: 40px; font-size:14px; width: 300px" maxlength="19" show-word-limit placeholder="请输入昵称" type="text"/>
                        <p style="cursor:no-drop; margin-top:2px; margin-left: 40px; font-size:14px; color: #888">@{{ userInfo.userName }}</p>
                        <el-input v-model="userInfo.userDescribe" style="width: 300px; margin-top:-2px; margin-left: 40px; font-size:14px;" :autosize="{ minRows: 5, maxRows: 6 }" maxlength="256" show-word-limit type="textarea" placeholder="请输入个性签名"/>
                      </div>

                      

                    </div> 
                  </el-row>

                  
                  
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
  width: 171px;
  height: 171px;
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
  width: 172px;
  height: 172px;
  text-align: center;
}

.avatar-edit-icon{
  font-size: 28px;
  color: #000000;
  width: 172px;
  height: 172px;
  text-align: center;
}

.avatar-edit-icon:hover{
  z-index:10;
}
</style>
