<script setup lang="ts">
import { ref, onMounted, inject, getCurrentInstance, reactive  } from "vue"
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue'
import store from '../store/index.ts';
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter();

onMounted(() =>{
  
})

const formRef = ref<FormInstance>()

const form = reactive({
  username:'',
  nickname:'',
  password:'',
  password_re:''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('密码不能为空'))
  } else {
    if (form.password_re != '') {
      if (!formRef.value) return
      formRef.value.validateField('password_re', () => null)
    }
    callback()
  }
}

const validatePassRe = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请再次输入密码'))
  } else if (value != form.password) {
    //console.log(form.password)
    callback(new Error("请输入相同的密码"))
  } else {
    callback()
  }
}

const regex = /^[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",.<>?~\\\/]*$/

const rules = {
  username:[
    {required:true, message:'用户名不能为空', trigger:'change'},
    {required:true, message:'用户名不能为空', trigger:'blur'},
    {min:2, max:19, message:'用户名长度为2-19个字符', trigger:'change'},
    {min:2, max:19, message:'用户名长度为2-19个字符', trigger:'blur'},
    {pattern:/^[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",.<>?~\\\/]*$/, message:'用户名只能由英文/数字/特殊符号组成', trigger:'change'},
    {pattern:/^[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",.<>?~\\\/]*$/, message:'用户名只能由英文/数字/特殊符号组成', trigger:'blur'}
  ],
  nickname:[
    {required:true, message:'昵称不能为空', trigger:'change'},
    {required:true, message:'昵称不能为空', trigger:'blur'},
    {min:2, max:19, message:'昵称长度为2-19个字符', trigger:'change'},
    {min:2, max:19, message:'昵称长度为2-19个字符', trigger:'blur'}
  ],
  password: [
    { validator: validatePass, trigger: 'change' },
    { validator: validatePass, trigger: 'blur' },
    {required:true, message:'密码不能为空', trigger:'change'},
    {required:true, message:'密码不能为空', trigger:'blur'},
    {pattern:/^[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",.<>?~\\\/]*$/, message:'密码只能由英文/数字/特殊符号组成', trigger:'change'},
    {pattern:/^[a-zA-Z0-9!@#$%^&*()-_=+{}\[\]|;:'",.<>?~\\\/]*$/, message:'密码只能由英文/数字/特殊符号组成', trigger:'blur'},
    {min:6, max:19, message:'密码长度为6-19个字符', trigger:'change'},
    {min:6, max:19, message:'密码长度为6-19个字符', trigger:'blur'}
  ],
  password_re: [
    { validator: validatePassRe, trigger: 'change' },
    { validator: validatePassRe, trigger: 'blur' },
    {required:true, message:'请再次输入密码', trigger:'change'},
    {required:true, message:'请再次输入密码', trigger:'blur'}
  ]
}

const clickLogin = () => {
  router.push({path: '/login'});
}

const isLoading = ref(false)

const Register = async () => {
  if (!formRef) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      isLoading.value = true
      register_submit()
      //console.log('submit!')
    } else {
      //console.log('error submit!', fields)
    }
  })
}

const { proxy } = getCurrentInstance()

let register_submit = async () => {
  let res = await proxy.$api.register(form)
  if (res.status == 201) {
    //console.log(res.status)
    isLoading.value = false
    ElMessage({message: '注册成功，请登录！', type: 'success',})
    router.push({path: '/Login'})
  } 
  else if(res.status == 202)
  {
    isLoading.value = false
    ElMessageBox.alert('当前用户名已被占用，请重试！',{confirmButtonText: '确认', center: true, confirmButtonClass: 'btnConfirm',})
  }
};

</script>

<template>
        <div style="display: grid; place-items: center;">
          <el-container>
              <el-card class="container_justify" style="margin-top:100px; margin-bottom:100px; width:600px; height: 530px">
                  <p style="margin-top:50px; font-size: 16px; font-weight: bold; text-align: center;">注 册</p>

                  <el-form :model="form" :rules="rules" ref="formRef">
                    <el-form-item prop="username">
                      <el-input v-model="form.username" style="width: 300px; margin-top:24px" placeholder="请输入用户名" :prefix-icon="User"/>
                    </el-form-item>
                    <el-form-item prop="nickname">
                      <el-input v-model="form.nickname" style="width: 300px; margin-top:6px" placeholder="请输入昵称" :prefix-icon="User"/>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="form.password" style="width: 300px; margin-top:6px" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock"/>
                    </el-form-item>
                    <el-form-item prop="password_re">
                      <el-input v-model="form.password_re" style="width: 300px; margin-top:6px" type="password" placeholder="请再次输入密码" show-password :prefix-icon="Lock"/>
                    </el-form-item>
                  </el-form>
                  <el-row>
                    <p @click="clickLogin" style="margin-left: 195px; font-size: 12px; color:#FFA500; font-weight: bold; cursor: pointer">已有账号？去登陆></p>
                  </el-row>
                  <el-row class="container_justify">
                    <el-button @click="Register" :loading="isLoading" color="#FFA500" style="margin-top:20px; width:300px;" plain >注 册</el-button>
                  </el-row>
                  
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
