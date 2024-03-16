<template>
    <el-card class="card" style="max-width: 100%; height: 120px; display:flex; justify-content: center; text-align: center;" shadow="never">
        <p :style="{ fontSize: 'smaller', color: '#888' }">本站为开源项目展示，仅用于学习</p>
        <span :style="{ fontSize: 'smaller', color: '#888' }">Copyright © 2024 Zymra</span>
        <el-divider direction="vertical" style="margin-left:10px; margin-right:10px" />
        <a style="font-size: smaller; color: #888" href="https://beian.miit.gov.cn/" target="_blank">京ICP备2024052220号</a>
    </el-card>
</template>

<style scoped>
.card{
    background-color: #ffffff;
}
a{
    text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
</style>
