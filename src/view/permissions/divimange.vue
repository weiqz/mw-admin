<template>
    <div v-if="actions.views=='n'&& getUserInfo.user_name!=='admin'">
        <el-alert title="您无权限浏览此页面信息！" type="warning"> </el-alert>
     </div>
    <div v-else>
        <Combox title="数据列表" ico="ivu-icon ivu-icon-md-list" :isFoot="true">
            <template v-slot:right>
                <el-button plain @click="addList" size="mini" v-if="actions.add==='y' || getUserInfo.user_name==='admin'">添加</el-button>
               <el-select v-model="seleValue" placeholder="显示条目" @change="handleSizeChange" size="mini" style="width:100px">
                    <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </template>
            <template v-slot:center>
                 <el-table ref="filterTable" :data="memListData.rows" border :fit="true" v-loading="tableLoad">
                        <el-table-column prop="department_name" label="部门名称" ></el-table-column>
                        <el-table-column prop="department_description" label="职能描述" ></el-table-column>
                        <el-table-column prop="department_number" label="成员数量" >
                            <template slot-scope="scope">
                                <router-link :to="{name:'memmange',params:{depa_id:scope.row.id}}">{{ scope.row.department_number }}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_time" label="添加时间"></el-table-column>
                        <el-table-column prop="is_valid" label="是否启用">
                            <template slot-scope="scope">
                                        <!-- <i class="el-icon-check" v-if="scope.row.is_valid === 1"></i>
                                        <i class="el-icon-close" v-else></i> -->
                                        <el-switch
                                        v-model="scope.row.is_valid"
                                        @change="isvalidFn(scope.row)"
                                        active-color="#13ce66"
                                        inactive-color="#ddd">
                                        </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actions" label="操作">
                            <template slot-scope="scope">
                                <router-link 
                                :to="{name:'permSeting',params:{id:scope.row.id}}" 
                                v-if="actions.setprivilege==='y' || getUserInfo.user_name==='admin'">
                                    权限设置
                                </router-link>
                                <a @click="edit(scope.row)" v-if="actions.update==='y' || getUserInfo.user_name==='admin'">编辑</a>
                                <!-- <a @click="delet" v-if="actions.delete==='y' || getUserInfo.user_name==='admin'">删除</a> -->
                            </template>
                        </el-table-column>
                </el-table>
            </template>
            <template v-slot:foot>
                 <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-size="seleValue"
                    layout="total, prev, pager, next, jumper"
                    :total="memListData.total">
                    </el-pagination>
            </template>
        </Combox> 

        <el-dialog
        :title="title"
        :visible.sync="showDig"
        width="30%">
        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="80px">
            <el-form-item label="部门名称" prop="department_name">
                <el-input v-model="formValidate.department_name"></el-input>
            </el-form-item>
            <el-form-item label="部门描述" prop="department_description">
                <el-input type="textarea" v-model="formValidate.department_description"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
import { adddivimange,changeDmActive,getdivimange,editdivimange } from '../../api/divimange'
    export default {
        data (){
            return {
                tableLoad:true,
                memListData:{},
                seleValue:10,
                department_id:'',
                showDig:false,
                title:'添加部门',
                currentPage4:1,
                actions:{},
                options:[10,15,20,50],
                formValidate:{
                    department_name:'',
                    department_description:''
                },
                ruleValidate:{
                    department_name:[
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    department_description:[
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ]
                }
            }
        },
        created (){
            this.getdivimList()
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
            getdivimList(){
                getdivimange({
                    page:this.currentPage4,
                    rows:this.seleValue,
                    cid:this.getmid,
                }).then((res)=>{
                    if(res.code=='0'){
                        res.data.rows.forEach((item)=>{
                            item.is_valid = item.is_valid === 1;
                        })
                        this.tableLoad = false;
                        this.memListData = res.data;
                        this.actions = res.data.actions
                    }
                })
            },
            addList (){
                this.formValidate.department_name = '';
                 this.formValidate.department_description = '';
                 this.title = '添加部门'
                this.showDig = true;
            },
            edit (row){
                 this.formValidate.department_name = row.department_name;
                 this.formValidate.department_description = row.department_description;
                 console.log(row)
                 this.department_id = row.id;
                 this.title = '编辑部门'
                 this.showDig = true;
            },
            delet (){

            },
            ok () {
                let {department_name,department_description} = this.formValidate;
                let reqFn = null;
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        if( this.title==='编辑部门' ){
                            reqFn= editdivimange({department_name,department_description,id:this.department_id})
                        }else{
                            reqFn= adddivimange({department_name,department_description})
                        }
                        reqFn.then((res)=>{
                            if(res.code=='0'){
                                this.getdivimList()
                            }else{
                                this.$message.error(res.msg);
                            }
                        })    
                    }
                })
            },
            cancel () {
              this.showDig = false
            },
            handleSizeChange(){
                this.getdivimList()
            },
            handleCurrentChange(val){
                this.currentPage4 = val
                this.getdivimList()
            },
            isvalidFn(row){
                
                this.$confirm('确定更改部门状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    changeDmActive({did:row.id}).then((res)=>{
                        if(res.code==='0'){
                            this.$message.success(res.data)
                            //this.getdivimList()
                        }else{
                            row.is_valid = !row.is_valid;
                            this.$message.error(res.msg)
                        }
                    }) 
                }).catch(()=>{
                    row.is_valid = !row.is_valid
                })


            }
        }
    }
</script>

<style lang="less" scoped>
    div.cell i.el-icon-check{
        color: @baseColor;
        font-size: 18px;
    }
    div.cell i.el-icon-close{
        color: rgb(255, 57, 57);
        font-size: 18px;
    }
</style>