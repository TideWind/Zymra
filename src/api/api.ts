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
    getYearPopularMusics(params) {
        return request({
            url: '/Music/GetYearPopularMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getMonthPopularMusics(params) {
        return request({
            url: '/Music/GetMonthPopularMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getWeekPopularMusics(params) {
        return request({
            url: '/Music/GetWeekPopularMusics/' + params,
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
    getUserMusics(params) {
        return request({
            url: '/Music/GetUserMusics/' + params,
            method: 'get',
            mock: false
        })
    },
    getSelfMusics(params) {
        return request({
            url: '/Music/GetSelfMusics',
            method: 'get',
            mock: false
        })
    },
    getSelfData(params) {
        return request({
            url: '/Music/GetSelfData',
            method: 'get',
            mock: false
        })
    },
    getFollowCount(params) {
        return request({
            url: '/User/GetFollowCount/' + params,
            method: 'get',
            mock: false
        })
    },
    getFanCount(params) {
        return request({
            url: '/User/GetFanCount/' + params,
            method: 'get',
            mock: false
        })
    },
    getLikeCount(params) {
        return request({
            url: '/User/GetLikeCount/' + params,
            method: 'get',
            mock: false
        })
    },
    getFollowState(params) {
        return request({
            url: '/User/GetFollowState/' + params,
            method: 'get',
            mock: false
        })
    },
    followUser(params) {
        return request({
            url: '/User/Follow/' + params,
            method: 'post',
            mock: false
        })
    },
    cancelFollowUser(params) {
        return request({
            url: '/User/CancelFollow/' + params,
            method: 'delete',
            mock: false
        })
    },
    getFollows(params) {
        return request({
            url: '/User/GetFollows/' + params,
            method: 'get',
            mock: false
        })
    },
    getFans(params) {
        return request({
            url: '/User/GetFans/' + params,
            method: 'get',
            mock: false
        })
    },
    editMusic(params) {
        return request({
            url: '/Music/EditMusic',
            method: 'put',
            data: params,
            mock: false
        })
    },
    deleteMusic(params) {
        return request({
            url: '/Music/DeleteMusic/' + params,
            method: 'delete',
            mock: false
        })
    },
    getMusicStatus(params) {
        return request({
            url: '/Music/GetMusicStatus/' + params,
            method: 'get',
            mock: false
        })
    },
    searchMusic(params) {
        return request({
            url: '/Music/SearchMusic',
            method: 'get',
            data: params,
            mock: false
        })
    },
    searchUser(params) {
        return request({
            url: '/User/SearchUser',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getTypeView(params) {
        return request({
            url: '/Music/GetTypeView/' + params,
            method: 'get',
            mock: false
        })
    },
}