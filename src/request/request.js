import axios from 'axios'
import Qs from 'qs'
import getToken from '../util/getToken'
//import store from '../store/index'
//import router from '../route/index'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://www.localhost.com',
  timeout: 15000,
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

request.interceptors.request.use( //请求拦截
  (config) => {
    // if (getToken()){
    //     config.headers.Authorization = getToken();
    // }
      if (config.url !== '/api/login/check-login') {

         
            config.url = config.url+'?token='+getToken();
          
        
      }
      return config
  }
)

request.interceptors.response.use( //响应拦截
  (response) => {
    let data = response.data;
    let msg = typeof data.data==='string'&&data.data!='' ? data.data : data.msg;
    if (data.code !== '0') {
      Message.error(msg)
    }else{
      let mt = response.config.method;
      if(mt === 'post'){
        Message.success(msg)
      }
      
    }
    return data
  },() => {
    Message.error('网络出错啦！')
  }
)

export default request