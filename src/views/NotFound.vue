<script setup lang="ts">

</script>

<template>
        <div style="display: grid; place-items: center;">
          <el-container>
              <el-card class="card" style="width:1080px; height: 1000px">
                <el-empty description=" "  style="margin-top:80px"/>
                <div class="container_justify">
                  <span style="font-weight: bold; margin-top:-50px">页面找不到哦~</span>
                </div>
              </el-card>
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
</style>
