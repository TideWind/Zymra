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
    getUserInfo(params) {
        return request({
            url: '/User/getUserInfo/' + params,
            method: 'get',
            mock: false
        })
    },
    getUserAvatar(params) {
        return request({
            url: '/User/Avatar/' + params,
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
    uploadMusic(formData, onUploadProgress) { // �޸Ĳ����б������� onUploadProgress
        return request({
            url: '/Music/uploadMusic',
            method: 'post',
            data: formData,
            mock: false,
            onUploadProgress // ���ϴ����Ȼص��������ݸ�����
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
    getMusics(params) {
        return request({
            url: '/Music',
            method: 'get',
            mock: false
        })
    },
}