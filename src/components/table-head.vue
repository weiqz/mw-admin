<template>
    <div class="table_layout">
        <div class="table_top_head">
            <h2 class="table-title">
                <Icon :type=ico />
                {{ title }}
            </h2>
            <div class="table-head-right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="table_center">
             <slot name="center"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:String,
            ico:String
        }
    }
</script>

<style lang="less" scoped>
    .table_layout{
        
    }
    .table_top_head{
        background: @backgColor;
        padding: 15px 25px;
        border: 1px solid #dedede;
        border-bottom: 0;
        h2.table-title{
            display: inline-block;
            font-size: 14px;
            color:#666;
            font-weight: 400;
        }
        .table-head-right{
            float:right;
            position: relative;
            top: -5px;
            button{
                margin-right: 10px;
            }
        }
    }
</style>