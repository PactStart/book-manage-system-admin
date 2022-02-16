import request from '@/utils/request'

const userApi = {
    addUser: '/user/add',
    queryUser: '/user/query',
    deleteUser: '/user/delete',
    getUser: '/user/getById',
    updateUser: '/user/update'
}

export function addUser (parameter) {
    return request({
        url: userApi.addUser,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function queryUser (parameter) {
    return request({
        url: userApi.queryUser,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function deleteUser (parameter) {
    return request({
        url: userApi.deleteUser,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getUser (parameter) {
    return request({
        url: userApi.getUser,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function updateUser (parameter) {
    return request({
        url: userApi.updateUser,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
