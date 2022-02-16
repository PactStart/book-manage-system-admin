import request from '@/utils/request'

const dashboardApi = {
    index: '/dashboard/index'
}

export function dashboardIndex (parameter) {
    return request({
        url: dashboardApi.index,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
