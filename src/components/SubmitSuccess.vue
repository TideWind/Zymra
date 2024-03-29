<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Select } from '@element-plus/icons-vue'

onMounted(() =>{

})

const onSubmit = () => {
  uploadMusic()
  //console.log(form.value)
}

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px;height:600px">
      <el-icon style="font-size: 40px; margin-top:200px; margin-left:40px" color="#FFA500"><Select /></el-icon>
      <p style="font-weight: bold; text-align:center">投稿成功!</p>
      <router-link :to="'/create/works'">
        <el-button color="#FFA500" style="margin-top:20px; margin-bottom:60px" plain>查看稿件列表</el-button>
      </router-link>
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
</style>
