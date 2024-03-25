import request from "./request.ts";


export default {
    login(params) {
        return request({
            url: '/auth/login',
            method: 'post',
            data: params,
            mock: false
        })
    },
    refreshToken(params) {
        return request({
            url: '/auth/refresh',
            method: 'post',
            data: params,
            mock: false
        })
    },
    register(params) {
        return request({
            url: '/auth/register',
            method: 'post',
            data: params,
            mock: false
        })
    },
    uploadAvatar(params) {
        return request({
            url: '/User/uploadAvatar',
            method: 'post',
            data: params,
            mock: false
        })
    },
    getSelfAvatar(params) {
        return request({
            url: '/User/getSelfAvatar',
            method: 'get',
            responseType: 'blob',
            mock: false
        })
    },
    getSelfUserInfo(params) {
        return request({
            url: '/User/getSelfUserInfo',
            method: 'get',
            mock: false
        })
    },
    uploadUserInfo(params) {
        return request({
            url: '/User/uploadUserInfo',
            method: 'post',
            data: params,
            mock: false
        })
    },
    // uploadMusic(params) {
    //     return request({
    //         url: '/Music/uploadMusic',
    //         method: 'post',
    //         data: params,
    //         mock: false,
    //     })
    // },
    uploadMusic(formData, onUploadProgress) { // 修改参数列表，添加 onUploadProgress
        return request({
            url: '/Music/uploadMusic',
            method: 'post',
            data: formData,
            mock: false,
            onUploadProgress // 将上传进度回调函数传递给请求
        })
    },
    uploadAudio(params) {
        return request({
            url: '/Music/upload',
            method: 'post',
            data: params,
            mock: false
        })
    },
}