import req from '../request/request'

export function addColumn(data){
    return req({
        url:'/api/column/add',
        method:'post',
        data
    })
}

export function getColList(params){
    return req({
        url:'/api/column/list',
        method:'get',
        params
    })
}

export function getActionList(params){
    return req({
        url:'/api/action/list',
        method:'get',
        params
    })
}

export function addAction(data){
    return req({
        url:'/api/action/add',
        method:'post',
        data
    })
}

export function updateAction(data){
    return req({
        url:'/api/action/update',
        method:'post',
        data
    })
}

export function getDepartPermi(params){
    return req({
        url:'/api/department/get-detail',
        method:'get',
        params
    })
}

export function updateDepartPermi(data){
    return req({
        url:'/api/department/update-detail',
        method:'post',
        data
    })
}


export function getColumnTop(){
    return req({
        url:'/api/column/top-list',
        method:'get'
    })
}

export function getColumnLe(params){
    return req({
        url:'/api/column/left-list',
        method:'get',
        params
    })
}

export function updateColu(data){
    return req({
        url:'/api/column/update',
        method:'post',
        data
    })
}

export function geteColuDet(params){
    return req({
        url:'/api/column/detail',
        method:'get',
        params
    })
}

export function getopaLogList(params){
    return req({
        url:'/api/log/list',
        method:'get',
        params
    })
}