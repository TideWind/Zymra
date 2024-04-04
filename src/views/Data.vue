<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"
import {
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'

onMounted(() =>{
  getSelfData()
})

const data = ref([]);

const { proxy } = getCurrentInstance()

let getSelfData = async () => {
  let res = await proxy.$api.getSelfData()
  if (res.status == 200) {
    data.value = res.data;
    //console.log(data.value)
  }
}

</script>

<template>
  <el-container>
    <el-card class="card" style="width:600px; min-height:300px; margin-top:100px; margin-bottom:100px">

      <el-row :gutter="16" style="margin-top:100px; margin-bottom:100px">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="data.totalViews" style="width:200px">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              累计播放量
              <el-tooltip
                effect="dark"
                content="累计播放量，增长量是相对于前一天的增量"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>比起昨天</span>

            <span v-if="data.increaseViews >= 0" class="green">
              {{ data.increaseViews }}
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>

            <span v-if="data.increaseViews < 0" class="red">
              {{ data.increaseViews }}
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>

          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="data.totalFans">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              粉丝数
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="data.totalLikes">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              累计喜欢数
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
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

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
  background:rgb(249, 249, 249); 
  height:100px;
}

.statistic-card:hover {
  background:rgb(255, 237, 205); 
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>