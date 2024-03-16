<template>
  <!-- router-view :   路由的整个出�?, 用来显示�? URL 对应的组�?; -->
  <router-view v-slot="{ Component }">
      <!-- keep-alive 是Vue提供的一个抽象组件，主要用于保留组件状态或避免重新渲染�? -->
      <keep-alive>
          <component :is="Component" />
      </keep-alive>
  </router-view>
</template>
 
<script>
</script>
 
<style lang="scss" scoped>
</style>