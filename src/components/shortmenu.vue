<template>
    <div class="top_short_menu">
        <h3>
            常用菜单
            <a>菜单管理</a>
        </h3>
        <ul>
            <li><router-link to="">dfdf</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
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
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .top_short_menu{
        position: absolute;
        top: 33px;
        left: 11px;
        padding: 15px;
        width: 394px;
        height: 233px;
        background: #fff;
        box-shadow: 0 2px 5px #e4e4e4;
        z-index: 999;
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
                margin-bottom: 10px;
                font-size: 12px;
                float: left;
                a{
                    color: #333;
                }
            }
        }
    }
</style>