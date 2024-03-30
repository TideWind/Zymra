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
    getMusicInfo(params) {
        return request({
            url: '/Music/getMusicInfo/' + params,
            method: 'get',
            mock: false
        })
    },
    viewMusic(params) {
        return request({
            url: '/Music/View/' + params,
            method: 'put',
            mock: false
        })
    },
    getPopularMusics(params) {
        return request({
            url: '/Music/GetPopularMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getNewMusics(params) {
        return request({
            url: '/Music/GetNewMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getRecommendMusics(params) {
        return request({
            url: '/Music/GetRecommendMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getLikeState(params) {
        return request({
            url: '/Music/GetLikeState/' + params,
            method: 'get',
            mock: false
        })
    },
    likeMusic(params) {
        return request({
            url: '/Music/Like/' + params,
            method: 'put',
            mock: false
        })
    },
    getLikeMusics(params) {
        return request({
            url: '/Music/GetLikeMusics/' + params,
            method: 'get',
            mock: false
        })
    },
}