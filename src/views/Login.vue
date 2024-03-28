<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive  } from "vue"
import { useRouter } from "vue-router";
import { ElMessageBox } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue'
import store from '../store/index.ts';
const router = useRouter();

onMounted(() =>{
  
})

const formRef = ref<FormInstance>()

const isLoading = ref(false)

const form = reactive({
  username:'',
  password:''
})

const rules = {
  username:[
    {required:true, message:'用户名不能为空', trigger:'change'}
  ],
  password: [
    {required:true, message:'密码不能为空', trigger:'change'},
  ]
}

const clickRegister = () => {
  router.push({path: '/register'});
}

const { proxy } = getCurrentInstance() // 注意这里，下面login函数会用到
        // vue3中获取表单数据需要使用reactive

const login = async () => {
  if (!formRef) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      //console.log(form)
      isLoading.value = true
      login_submit()
    } else {
      //console.log('error submit!', fields)
    }
  })
}

let login_submit = async () => {
  let res = await proxy.$api.login(form) // 通过$api来调用login
  //console.log(formData)
  if (res.data.code === 200) {  // 如果返回码是200表明账号密码正确，校验通过
    // 下面两行代码是获取后端返回的access token和refresh token并存储起来,方便后面使用
    //console.log(res)
    store.commit('setAccessToken', res.data.access_token)
    store.commit('setRefreshToken', res.data.refresh_token)
    store.commit('setCurrentUsername', form.username)
    store.commit('updateLastRefreshTime')  // 更新最近一次刷新access token的时间，用于比较access token是否过期，这里要和jwt的内容联系起来看
    isLoading.value = false
    router.push({ // 跳转到主页面，
      path: '/home'
    })
  } else {
    //console.log(form)
    // 如果账号密码错误的话就要进行提示，并且重新回到登录页面
    //input_password.value = ''
    isLoading.value = false
    ElMessageBox.alert('账号或密码错误，请重试！',{confirmButtonText: '确认', center: true, confirmButtonClass: 'btnConfirm',})
  }
};

</script>

<template>
        <div style="display: grid; place-items: center;">
          <el-container>
              <el-card class="container_justify" style="margin-top:100px; margin-bottom:100px; width:600px; height: 400px">
                  <p style="margin-top:50px; font-size: 16px; font-weight: bold; text-align: center;">登 录</p>

                  <el-form :model="form" :rules="rules" ref="formRef">
                    <el-form-item prop="username" style="margin-top:40px">
                        <el-input v-model="form.username" style="width: 300px" placeholder="请输入用户名" :prefix-icon="User"/>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="form.password" style="width: 300px; margin-top:6px" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock"/>
                    </el-form-item>
                  <el-row style="margin-top:-8px">
                    <p style="font-size: 12px; cursor: pointer">忘记密码？</p>
                    <p @click="clickRegister" style="margin-left: 180px; font-size: 12px; color:#FFA500; font-weight: bold; cursor: pointer">立即注册></p>
                  </el-row>
                  <el-row class="container_justify">
                    <el-button @click="login()" :loading="isLoading" color="#FFA500" style="margin-top:16px; width:300px;" plain >登 录</el-button>
                  </el-row>
                </el-form>
                  
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

.el-input{
    --el-input-focus-border-color:#ffd04b;
    --el-input-icon-color:black;
}
.clickable:hover {
  cursor: pointer;
}
</style>

<style>
.btnConfirm {
  --el-button-bg-color: rgb(255, 246, 230);
  --el-button-text-color: #FFA500;
  --el-button-border-color: rgb(255, 210, 128);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: #FFA500;
  --el-button-hover-border-color: #FFA500;
  --el-button-active-bg-color: rgb(208, 136, 4);
  --el-button-active-text-color: var(--el-color-white);
  --el-button-active-border-color: rgb(208, 136, 4);
}
</style>
