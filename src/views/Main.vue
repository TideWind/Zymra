<script setup lang="ts">
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="background">
      <el-header class="header">
        <Menu />
      </el-header>
      <el-main class="main">
        
            <router-view v-slot="{ Component }">
              <template v-if="Component">

                  <KeepAlive>
                    <suspense>
                      <Transition name="fade">
                        <component :is="Component"></component>
                      </Transition>
                      <template #fallback>
                        <div style="display: grid; place-items: center;">
                          <el-card class="container_justify" style="width:1080px; height: 1000px">
                            <el-skeleton style="margin-top: 80px;" :rows="6" animated />
                          </el-card>
                        </div>
                      </template>
                    </suspense>
                  </KeepAlive>

              </template>
            </router-view>

      </el-main>
      <el-footer class="footer">
        <Footer />
      </el-footer>
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
.el-carousel__item el-image {
  margin: 0;
  justify-content: center;
  align-items: center;
}
.background{
  background-color: rgb(245,245,245);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
 
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
