import axios from 'axios'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import store from '../store/index.ts'
import { useRouter } from 'vue-router';


const NETWORK_ERROR = '网络请求错误，请稍后重试...'

axios.defaults.timeout = 100000000;

const service = axios.create({
    baseURL: '/api',
    timeout: 100000000, // 设置超时时间为1000毫秒（1秒）
    maxContentLength: 100000000,
    maxBodyLength: 100000000
})

service.interceptors.request.use((req) => {
    //可以在请求之前做一些事情
    //比如自定义header， jwt-token等等
    return req
})

service.interceptors.response.use((res) => {
    // 对请求得到的响应做一些处理
    if (res.status === 200) {
        // 状态码是200表明请求正常，可以返回请求到的数据也可以做一些其他事情
        return res
    } else {
        // 状态码不是200说明请求可能出错
        // ElMessage.error(NETWORK_ERROR)
        // return Promise.reject(NETWORK_ERROR)
        // 这里的封装不完善，直接抛出异常会导致页面不能正常提醒用户，先这样返回，以后修改
        return res
    }
})

let tokenRefresher = async () => {
    let router = useRouter()
    let now = new Date().getTime()
    if (now - Cookies.get('last_token_refresh_time') > 1000 * 60 * 59) {//1000 * 60 * 4
        let res = await service({
            url: '/auth/refresh',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            },
            params: {
                token: `${Cookies.get('refresh_token')}`
            }
        })
        //console.log(res)
         if (res.status === 200) {
             store.commit('setAccessToken', res.data.access_token)
         } else if (res.status === 401) {
             // refresh token过期了，要求重新登录
             store.commit('clearRefreshToken')
             store.commit('clearAccessToken')
             router.push({
                 name: 'login'
             })
         }
    }
}

function request(options) {
    options.method = options.method || 'get' // 如果没有传入method这个参数，就默认是get请求
    if (options.method.toLowerCase() === 'get') {
        // console.log(options)
        options.params = options.data
    }
    // 如果可以从cookie中获取到access_token，就添加到header中
    if (Cookies.get('access_token')) {
        // 设置token之前先检查是否需要更新token
        tokenRefresher()
        service.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`
    }
    if (options.onUploadProgress) {
        options.onUploadProgress = options.onUploadProgress; 
    }
    return service(options)
}

export default request