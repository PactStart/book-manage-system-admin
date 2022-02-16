import request from '@/utils/request'

const categoryApi = {
    addCategory: '/book/category/add',
    getCategory: '/book/category/getById',
    updateCategory: '/book/category/update',
    queryCategory: '/book/category/query',
    getSubCategory: '/book/category/getByPid',
    deleteCategory: '/book/category/delete',
    getCategoryTree: '/book/category/tree'
}

export function addCategory (parameter) {
    return request({
        url: categoryApi.addCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getCategory (parameter) {
    return request({
        url: categoryApi.getCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function updateCategory (parameter) {
    return request({
        url: categoryApi.updateCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function queryCategory (parameter) {
    return request({
        url: categoryApi.queryCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getCategoryTree (parameter) {
    return request({
        url: categoryApi.getCategoryTree,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getSubCategory (parameter) {
    return request({
        url: categoryApi.getSubCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function deleteCategory (parameter) {
    return request({
        url: categoryApi.deleteCategory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
