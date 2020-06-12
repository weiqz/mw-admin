<template>
  <div v-if="actions.view=='n'&& getUserInfo.user_name!=='admin'">
        <el-alert title="您无权限浏览此页面信息！" type="warning"> </el-alert>
  </div>
    <div v-else>
        <Combox title="筛选查询" ico="ivu-icon ivu-icon-ios-search-strong" :isBorder="true">
            <template v-slot:right>
                <a class="sqsx" style=""><i class="el-icon-arrow-up"></i> 收起筛选</a>
                <el-button plain size="mini" @click="query">查询结果</el-button>
            </template>
            <template v-slot:center>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin:15px 0 15px 30px">
                    <el-form-item label="操作人员">
                        <el-select v-model="formInline.opauser" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="item in opauserList" :key="item.id" :label="item.full_name" :value="item.full_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作日期">
                        <el-date-picker
                            v-model="formInline.opadate"
                            type="date"
                            placeholder="选择日期" 
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                    </el-form-item>
                </el-form>
            </template>
        </Combox>

        <Combox title="数据列表" ico="ivu-icon ivu-icon-md-list" :isFoot="true">
            <template v-slot:right>
                <div style="display:inline-block" v-if="actions.delLog==='y' || getUserInfo.user_name==='admin'">
                    <span style="font-size:12px;">清除日志：</span>
                    <el-select v-model="clearValue" placeholder="请选择" size="mini" style="width:130px">
                        <el-option
                        v-for="item in options2"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-button plain size="mini" @click="clearLog">确定</el-button>
                </div>
               
               <el-select v-model="seleValue" @change="handleSizeChange" placeholder="显示条目" size="mini" style="width:100px">
                    <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </template>
            <template v-slot:center>
                 <el-table tooltip-effect="dark" ref="filterTable" v-loading="tableLoad" :data="logdata.rows" border :fit="true" @selection-change="handleSelectionChange">
                     <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                        <el-table-column prop="user_id" label="编号" width="100px"></el-table-column>
                        <el-table-column prop="user_name" label="操作者" width="200px"></el-table-column>
                        <el-table-column prop="created_time" label="操作日期" width="300px"></el-table-column>
                        <el-table-column prop="context" label="操作记录" ></el-table-column>
                </el-table>
            </template>
            <template v-slot:foot>
                <div class="foot-r-opa">
                    <el-button plain size="mini" type="pprimary" @click="clearLogFoot">清除选中</el-button>
                </div>
                 <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="seleValue"
                    layout="total, prev, pager, next, jumper"
                    :total="logdata.total">
                </el-pagination>
            </template>
        </Combox>
    </div>
</template>

<script>
import { getopaLogList } from '../../api/permissions'
import { getUserList } from '../../api/user'
    export default {
        data (){
            return {
                formInline:{
                    opauser:'',
                    opadate:''
                },
                tableLoad:true,
                clearValue:'',
                opauserList:[],
                options2:['一周之前','一个月前','三个月前','半年前','一年前'],
                currentPage:1,
                title:'添加部门',
                options:[10,15,20,50],
                logdata:{},
                seleValue:10,
                actions:{},
                selection:[]
            }
        },
        created(){
            this.getopaLog();
            this.getUser()
        },
        computed: {
            getmid(){
                return this.$store.getters.mid;
            },
            getUserInfo(){
                return JSON.parse(localStorage.getItem('userinfo'))
            },
        },
        methods:{
            getopaLog(){
                getopaLogList({
                    page:this.currentPage,
                    rows:this.seleValue,
                    cid:this.getmid,
                    start_date:this.formInline.opadate,
                    end_date:this.formInline.opadate
                }).then((res)=>{
                    if(res.code!=='0'){
                        this.$message.error(res.msg)
                    }else{
                        this.tableLoad = false;
                        res.data.rows.forEach((item)=>{
                            item.created_time = this.$formatDate(item.created_time);
                        })
                        this.logdata = res.data;
                        this.actions = res.data.actions;
                    }
                })
            },
            getUser(){
                getUserList({
                    page:1,
                    rows:200,
                    cid:this.getmid,
                }).then((res)=>{
                    if(res.code=='0'){
                         this.opauserList = res.data.rows;
                    }
                })
            },
            handleSizeChange(){
                this.getopaLog()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.getopaLog()
            },
            query(){
                this.getopaLog()
            },
            clearLog(){

            },
            handleSelectionChange(selection){
                this.selection = selection
            },
            clearLogFoot(){

            }
        }
    }
</script>

<style lang="less" scoped>
.table-head-right .el-input{
    width: 130px;
}
.foot-r-opa{
    position: absolute;
    bottom: 7px;
    left: 15px;
}
</style>