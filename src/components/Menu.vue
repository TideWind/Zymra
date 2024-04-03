  <template>
    <el-menu
      :default-active="activeMenu"
      ref="menu"
      id="menu"
      router=true
      class="menu"
      mode="horizontal"
      background-color="#2D2D2D"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <router-link to='/home' @click="clickHome">
        <img src="../assets/zymra_logo.svg" class="logo" alt="Zymra logo" />
      </router-link>
      <el-sub-menu>
        <template #title>发现音乐</template>
        <el-menu-item index="/list">作品检索</el-menu-item>
        <el-menu-item index="/rank">排行榜</el-menu-item>
        <el-menu-item index="/explore">猜你想听</el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="'/follow' + username">关注</el-menu-item>
      <el-menu-item index="/create">音乐创作</el-menu-item>
      <el-input
        v-model="input_search"
        style="width: 240px; height: 30px; margin-left: 10px; --el-color-primary:#FFA500"
        placeholder="搜索音乐/用户"
        :prefix-icon="Search"
      />
      <el-button @click="search" clearable style="z-index:10; width: 40px; height: 30px; margin-left: -40px; margin-right: 10px" color="#FFA500" plain><el-icon><Search/></el-icon></el-button>
      <el-menu-item :index="'/user' + username" @click="getSelfUsername">个人中心</el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, onMounted, getCurrentInstance } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import Cookies from 'js-cookie'

  const input_search = ref('')

  onMounted(() =>{
    //getSelfUsername()
  })

  const { proxy } = getCurrentInstance()

  const username = ref(Cookies.get('current_username')==null ? '' : '/' + Cookies.get('current_username'))

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

const search = () => {
  router.push({name: 'List', query: { keyword: input_search.value },});
  input_search.value = ''
}
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

<style>
.el-input__inner {
  padding-right:40px;
}
</style>
