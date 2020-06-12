import req from '../request/request'

export function setpass(data) {
  return req({
    url: '/api/user/update-password',
    method: 'post',
    data
  })
}