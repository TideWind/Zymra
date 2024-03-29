<script setup lang="ts">
import { ref, onMounted } from "vue"

onMounted(() =>{

})

</script>

<template>
  <el-container>
    <el-card class="card" style="width:1080px; height:800px">
  
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
</style>