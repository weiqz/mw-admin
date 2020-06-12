import req from '../request/request'

export function getUserList(params){
    return req({
        url:'/api/user/list',
        method:'get',
        params
    })
}

export function addUser(data){
    return req({
        url:'/api/user/add',
        method:'post',
        data
    })
}

export function updateUser(data){
    return req({
        url:'/api/user/update',
        method:'post',
        data
    })
}

export function userdetail(params){
    return req({
        url:'/api/user/detail',
        method:'get',
        params
    })
}

export function delUser(params){
    return req({
        url:'/api/user/del',
        method:'get',
        params
    })
}

export function changeUserActive(params){
    return req({
        url:'/api/user/active',
        method:'get',
        params
    })
}