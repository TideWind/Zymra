  <template>
    <el-menu
      :default-active="activeMenu"
      ref="menu"
      id="menu"
      router="true"
      class="menu"
      mode="horizontal"
      background-color="#2D2D2D"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <router-link to='/' @click="clickHome">
        <img src="../assets/zymra_logo.svg" class="logo" alt="Zymra logo" />
      </router-link>
      <el-sub-menu>
        <template #title>发现音乐</template>
        <el-menu-item index="/list">作品检索</el-menu-item>
        <el-menu-item index="/rank">排行榜</el-menu-item>
        <el-menu-item index="/explore">探索</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/user/follow">关注</el-menu-item>
      <el-menu-item index="/create">音乐创作</el-menu-item>
        <el-input
          v-model="input_search"
          style="width: 240px; height: 30px; margin-left: 10px; margin-right: 10px;"
          placeholder="搜索音乐/用户"
          :prefix-icon="Search"
        />
      <el-menu-item index="/user">个人中心</el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  const input_search = ref('')
 
  const handleSelect = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath)
  }
  const clickHome = () => {
    
  }
  import { onMounted } from 'vue';


  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const activeMenu = ref<string>('');;
  //let menu = ref(null);
  watch(
      () => router.currentRoute.value,
      (to, from) => {
        if (to.path == '/home') {
          activeMenu.value = 'null1';
          //window.location.reload();
          //console.log(menu.activeIndex);
        }
        if (from.path == '/home') {
          activeMenu.value = 'null2';
          //window.location.reload();
          //console.log(menu.activeIndex);
        }
        // if (from.path == '/home' && to.path == '/home') {
        //   window.location.reload();
        // }
      }
    );

  onMounted(() => {
  const { path } = useRoute(); // 获取当前路径
  activeMenu.value = path.replace(/^\//, ''); // 将当前路径和激活菜单绑定
  //console.log(activeMenu.value);
});
  </script>

<style scoped>
.menu{
  justify-content: center;
  align-items: center;
}
.logo {
  height: 4em;
  padding: 0em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #ffd04b);
}
.el-menu--horizontal.el-menu {
    border-bottom: 0;
}
</style>
