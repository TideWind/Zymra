<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive } from "vue"
import { useRouter, useRoute } from "vue-router";
import store from '../store/index.ts';

import upload_icon from '../assets/images/icon/upload_icon.vue'
import data_icon from '../assets/images/icon/data_icon.vue'
import file_icon from '../assets/images/icon/file_icon.vue'

const router = useRouter();

onMounted(() =>{
  const { path } = useRoute(); // 获取当前路径
  activeMenu.value = path; // 将当前路径和激活菜单绑定
  console.log(activeMenu.value)
})

const activeMenu = ref<string>("");;
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu router=true :default-active="activeMenu" active-text-color="#ea9800" style="height:100%">

        <el-menu-item index="/create/submit">
          <el-icon><upload_icon /></el-icon>
          <span style="margin-left:20px">投稿</span>
        </el-menu-item>

        <el-menu-item index="/create/works">
          <el-icon><file_icon /></el-icon>
          <span style="margin-left:20px">稿件</span>
        </el-menu-item>

        <el-menu-item index="/create/data">
          <el-icon><data_icon /></el-icon>
          <span style="margin-left:20px">数据</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-main class="main" style="display: grid; place-items: center;">
      <router-view v-slot="{ Component }">
      </router-view>
    </el-main>
    
    
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
