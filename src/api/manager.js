import request from '@/utils/request'

const managerApi = {
    addManager: '/manager/add',
    queryManager: '/manager/query',
    deleteManager: '/manager/delete',
    getManager: '/manager/getById',
    updateManager: '/manager/update'
}

export function addManager (parameter) {
    return request({
        url: managerApi.addManager,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function queryManager (parameter) {
    return request({
        url: managerApi.queryManager,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function deleteManager (parameter) {
    return request({
        url: managerApi.deleteManager,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getManager (parameter) {
    return request({
        url: managerApi.getManager,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function updateManager (parameter) {
    return request({
        url: managerApi.updateManager,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
