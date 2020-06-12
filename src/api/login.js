import req from '../request/request'

export function login(data){
    return req({
        url:'/api/login/check-login',
        method:'post',
        data
    })
}

export function logouts(){
    return req({
        url:'/api/login/log-out',
        method:'get'
    })
}