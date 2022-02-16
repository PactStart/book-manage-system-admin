import request from '@/utils/request'

const loginApi = {
    login: '/manager/login',
    logout: '/manager/logout',
    getInfo: '/manager/getInfo',
    // 待实现
    forgePassword: '/auth/forge-password',
    Register: '/manager/register',
    twoStepCode: '/manager/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    UserInfo: '/user/info',
    UserMenu: '/user/nav'
}

export function login (parameter) {
    return request({
        url: loginApi.login,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function logout () {
    return request({
        url: loginApi.logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getInfo () {
    return request({
        url: loginApi.getInfo,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: loginApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function get2step (parameter) {
  return request({
    url: loginApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function getCurrentUserNav () {
  return request({
    url: loginApi.UserMenu,
    method: 'get'
  })
}
