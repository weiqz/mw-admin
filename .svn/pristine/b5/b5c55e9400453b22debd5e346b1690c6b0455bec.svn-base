<template>
    <div id="login">
        <div class="login_cen">
            <h1>魔界</h1>
            <el-input
                placeholder="请输入用户名称"
                size="large"
                prefix-icon="ivu-icon ivu-icon-md-person"
                v-model="userinfo.user_name">
            </el-input>
            <br>
            <el-input
                placeholder="请输入登录密码"
                size="large"
                 type="password"
                prefix-icon="ivu-icon ivu-icon-ios-lock"
                v-model="userinfo.password">
            </el-input>
            <br>
            <el-button plain @click="loginFn" :loading=loading>登录</el-button>
        </div>
    </div>
</template>

<script>
import { login } from '../api/login'
import { getColumnTop } from '../api/permissions'
//import { getColumnLeft } from '../api/permissions'
    export default {
        data(){
            return {
                userinfo:{
                    user_name:'admin',
                    password:'123456',
                    columnTop:[]
                },
                 loading:false
            }
        },
        methods:{
            loginFn (){
                this.loading = true
                if(this.userinfo.user_name=='' || this.userinfo.password==''){
                     this.$Message.warning('请将信息填写完整！');
                    return false
                }
                login(this.userinfo).then((res) => {
                    console.log(res)
                    if(res.code==1){
                        this.$Message.error('用户名或密码有误！');
                        return false
                    }
                    localStorage.setItem('userinfo',JSON.stringify(res.data));
                    this.$store.commit('saveToken',res.data.token)
                    this.loading = false
                    this.getcolumntop();
                }).catch(() =>{
                    this.loading = false
                    this.$message.error('登录失败，请稍后再试!');
                })
            },
            getcolumntop(){
                getColumnTop().then((res) => {
                    this.columnTop = res.data;
                    localStorage.setItem('columnTop',JSON.stringify(res.data));
                    this.$router.options.routes.forEach((item) => {
                        if(item.headNav) this.isPermiss(item)
                    });
                    this.$router.push('/index')
                })
            },
            isPermiss (route_item){
                let top_navs = this.columnTop;
                top_navs.forEach((n) => {
                    if(n.column_name===route_item.meta.title){
                        route_item.meta.cid = n.id;
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    div#login{
        width: 100%;
        height: 100%;
        background: url('../assets/login_bg.png') rgba(0, 153, 255,1);
        position: relative;
        .login_cen{
            h1{
                color: #fff;
                font-size: 35px;
                text-align: center;
                margin-bottom: 50px;
            }
            width: 300px;
            position: absolute;
            top: 20%;
            left: 50%;
            margin-left: -150px;
        }
    }

    .el-button{
        font-size: 18px;
        color: #2288c3;
        width: 300px;
        height: 50px;
        border: 0;
    }
</style>