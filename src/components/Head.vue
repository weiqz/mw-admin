<template>
  <div id="head">
    <h1 class="logo">{{ logo }}</h1>
    <ul class="top_nav">
      <li v-for="item in menudata" :key="item.path">
        <router-link :to=item.path>{{ item.meta.title }}</router-link>
      </li>
    </ul>
    <div class="head_nav_right">
      <a class="user_top_btn" @mouseover="show_digbox('userInfo')" @mouseleave="userOut">
        <i class="ivu-icon ivu-icon-ios-contact"></i>
        <span class="user_name" v-if="getUserInfo">{{ getUserInfo.user_name }}</span>  
      </a>
      <router-link to="/index" title="首页"><i class="ivu-icon ivu-icon-md-home" ></i></router-link>
      <a title="快捷菜单"> <i class="ivu-icon ivu-icon-md-menu" ></i></a>
      <a title="通知"><i class="ivu-icon ivu-icon-md-notifications-outline"></i></a>

      <a title="换肤"><i class="ivu-icon ivu-icon-ios-color-palette"></i></a>
      <a @click="logout" style="border:0" title="退出登录"><i class="ivu-icon ivu-icon-md-power" ></i></a>
      <div class="dig_box" v-show="isShowuser" @mouseleave="mouseLeave" @mouseover="mouseover">
          <component :is="componentId"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { logouts } from '../api/login'
import userInfo from './userinfo'
export default {
  props: {
    
  },
  data (){
    return {
      logo:'魔界',
      menudata:[],
      isShowuser:false,
      timer:null,
      componentId:''
    }
  },
  components:{
    userInfo
  },
  created (){
    this.initTopMenu();
  },
  computed:{
    getUserInfo(){
      return JSON.parse(localStorage.getItem('userinfo'))
    },
    gColumntop(){
      return JSON.parse(localStorage.getItem('columnTop'))
    }
  },
  methods:{
    handleNavClick(){
        
    },
    initTopMenu(){
      this.$router.options.routes.forEach((item) => {
        if(item.headNav) this.isPermiss(item)
      });
    },
    isPermiss (route_item){
      let top_navs = this.gColumntop;
      top_navs.forEach((n) => {
        if(n.column_name===route_item.meta.title){
          route_item.meta.cid = n.id;
          this.menudata.push(route_item);
        }
      })
    },
    userOut(){
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShowuser = false
      },1000)
    },
    logout(){
        this.$confirm('确定退出系统?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
                logouts().then((res)=>{
                  if(res.code === '0'){
                      this.$store.commit('removeToken');
                      this.$router.push('/login')
                  }else{
                      this.$message.error('退出失败！');
                  }
                })              
            }).catch(()=>{

            })


    },
    mouseover(){
        clearTimeout(this.timer)
    },
    mouseLeave (){
        this.isShowuser=false
    },
    show_digbox (id){
      this.isShowuser = true
      this.componentId = id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.dig_box{
    position: absolute;
    top: 35px;
    left: -18px;
    padding: 15px;
    width: 394px;
    height: 233px;
    background: #fff;
    box-shadow: 0 2px 5px #e4e4e4;
    z-index: 999;
}    
h3 {
  margin: 40px 0 0;
  span {
    color:#fff;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
#head{
  height: 48px;
  border-bottom: 2px solid #474b56;
  background: #595e6c;
  width: 100%;
  .logo{
    color:#fff;
    font-size: 20px;
    line-height: 50px;
    margin-left: 45px;
    float: left;
  }
  .top_nav{
    float: left;
    height: 100%;
    margin-left: 10px;
    li{
      float: left;
      a{
        display: block;
        line-height: 50px;
        padding: 0 18px;
        color: #fff;
        font-size:12px;
        &:hover{
          color: #ddd;
        }
      }

    }
  }
}
.head_nav_right{
  float: right;
  position: relative;
  top: 15px;
  right:30px;
  a{
    display: inline-block;
    color: #fff;
    padding: 0 18px;
    font-size: 12px;
    border-right:1px solid #434854;
    cursor: pointer;
    &:hover{
      opacity: 0.9;
    }
    i{
      display: inline-block;
      color: #fff;
      font-size: 21px;
    }
    i.el-icon-s-custom{
      padding: 0;
    }
    span.user_name{
      margin-left: 5px;
      position: relative;
      top: -3px;
    }
  }
}
</style>
