import axios from 'axios'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import store from '../store/index.ts'
import { useRouter } from 'vue-router';


const NETWORK_ERROR = '��������������Ժ�����...'


const service = axios.create({
    baseURL: '/api',
})

service.interceptors.request.use((req) => {
    //����������֮ǰ��һЩ����
    //�����Զ���header�� jwt-token�ȵ�
    return req
})

service.interceptors.response.use((res) => {
    // ������õ�����Ӧ��һЩ����
    if (res.status === 200) {
        // ״̬����200�����������������Է������󵽵�����Ҳ������һЩ��������
        return res
    } else {
        // ״̬�벻��200˵��������ܳ���
        // ElMessage.error(NETWORK_ERROR)
        // return Promise.reject(NETWORK_ERROR)
        // ����ķ�װ�����ƣ�ֱ���׳��쳣�ᵼ��ҳ�治�����������û������������أ��Ժ��޸�
        return res
    }
})

let tokenRefresher = async () => {
    let router = useRouter()
    let now = new Date().getTime()
    if (now - Cookies.get('last_token_refresh_time') > 1000 * 60 * 4) {
        let res = await service({
            url: '/auth/refresh/',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            },
            data: {
                refresh: `${Cookies.get('refresh_token')}`
            }
        })
        if (res.status === 200) {
            store.commit('setAccessToken', res.data.access)
        } else if (res.status === 403) {
            // refresh token�����ˣ�Ҫ�����µ�¼
            store.commit('clearRefreshToken')
            store.commit('clearAccessToken')
            router.push({
                name: 'login'
            })
        }
    }
}

function request(options) {
    options.method = options.method || 'get' // ���û�д���method�����������Ĭ����get����
    if (options.method.toLowerCase() === 'get') {
        // console.log(options)
        options.params = options.data
    }
    // ������Դ�cookie�л�ȡ��access_token������ӵ�header��
    if (Cookies.get('access_token')) {
        // ����token֮ǰ�ȼ���Ƿ���Ҫ����token
        tokenRefresher()
        service.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`
    }
    return service(options)
}

export default request