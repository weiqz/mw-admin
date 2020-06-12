<template>
    <div class="center">
        <div class="heads">
            <Head></Head>
        </div>
        <div class="slides">
           <Slide></Slide>
        </div>
        <div class="main_m">
            <topTitle></topTitle>
            <div class="main_m_center">
                <router-view v-if="isRouteAlive"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './Head'
import Slide from './Slide'
import topTitle from './top-title'

    export default {
        data (){
            return {
                isRouteAlive:true
            }
        },
        provide(){
            return {
                reloads:this.reload
            }
        },
        components:{
            Head,
            Slide,
            topTitle
        },
        methods:{
            reload(){
                this.isRouteAlive=false;
                this.$nextTick(function (){
                    this.isRouteAlive=true
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.center{
    width: 100%;
    height: 100%;
    position: relative;
}
.slides{
    position: absolute;
    width: 180px;
    left: 0;
    top:50px;
    bottom: 0;
    background: #eaedf1;
    border-right:1px solid #e4e4e4;
}
.main_m{
    position: absolute;
    left: 181px;
    right: 0;
    top: 50px;
    bottom: 0;
    overflow: hidden;
    overflow-y:auto ;
    .main_m_center{
        margin: 30px 50px;
    }
}
</style>