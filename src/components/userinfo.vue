<template>
    <div class="top_user_info">
        <h3>
            账户信息
            <router-link to="/account">账户设置</router-link>
        </h3>
        <ul>
            <li>所在部门：<span>{{ userInfo.department_name }}</span></li>
            <li>本次登录：<span>{{ userInfo.login_time }}</span></li>
            <li>登录地区：<span>{{ userInfo.area }}</span></li>
            <li>上次登录：<span>{{ userInfo.last_time }}</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{

        },
        data (){
            return {
                userInfo:{}
            }
        },
        created (){
            this.getUserInfo()
        },
        methods:{
            getUserInfo (){
                let u = JSON.parse(localStorage.getItem('userinfo'));
                if(u){
                    this.userInfo = u.user_info;
                    console.log(u.user_info)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .top_user_info{

        h3{
                font-size: 12px;
            font-weight: 400;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            a{
                float: right;
                color: @baseColor;
            }
        }
        ul{
            margin-left: 20px;
            margin-top: 20px;
            li{
                color: #888;
                margin-bottom: 10px;
                font-size: 12px;
                span{
                    color: #333;
                }
            }
        }
    }
</style>