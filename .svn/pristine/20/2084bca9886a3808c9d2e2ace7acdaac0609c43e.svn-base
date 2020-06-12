<template>
    <div>
        <div style="margin:40px 0 40px 100px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="column_name">
                    <el-input v-model="ruleForm.column_name"></el-input>
                </el-form-item>
                <el-form-item label="栏目路径" prop="column_path">
                    <el-input v-model="ruleForm.column_path"></el-input>
                </el-form-item>
                <el-form-item label="栏目图标" prop="icon_path">
                    <el-input v-model="ruleForm.icon_path"></el-input>
                </el-form-item>
                <el-form-item label="栏目位置" prop="column_position">
                    <el-input v-model="ruleForm.column_position"></el-input>
                </el-form-item>
            </el-form>    
            <!-- <label>栏目名称：</label>
             <el-select v-model="value" placeholder="请选择栏目">
                <el-option
                v-for="item in coloptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select> -->
        </div>
        
    </div>
</template>

<script>
import { addColumn, updateColu, geteColuDet} from '../../api/permissions'
    export default {
        props:{
            editid:Number
        },
        data (){
            return {
                // value:'',
                // coloptions:[
                //     {label:'首页',value:'0'},
                //     {label:'商品',value:'1'},
                //     {label:'项目',value:'2'},
                //     {label:'订单',value:'3'},
                //     {label:'库存',value:'4'},
                //     {label:'门店',value:'5'},
                //     {label:'会员',value:'6'},
                //     {label:'促销',value:'7'},
                //     {label:'运营',value:'8'},
                //     {label:'内容',value:'9'},
                //     {label:'统计',value:'10'},
                //     {label:'财务',value:'11'},
                //     {label:'设置',value:'12'},
                //     {label:'权限',value:'13'}
                // ]
                ruleForm: {
                        column_name: '',
                        column_path: '',
                        icon_path: '',
                        column_position: '',
                },
                rules: {
                        column_name: [ 
                            { required: true, message: '请输入名称' }
                        ],
                        column_path: [
                            { required: true, message: '请输入路径'}
                        ]
                }
            }    
        },
        methods:{
            initData(){
                Object.assign(this.$data, this.$options.data());
            },
            addRequest (){
                addColumn(this.ruleForm).then((res) => {
                    if(res.code==='0'){
                        this.$emit('uplist');
                    }else{
                        this.$message.error(res.data.column_name)
                    }
                })
            },
            editRequest (){
                updateColu(this.ruleForm).then((res) => {
                    if(res.code==='0'){
                        this.$emit('uplist');
                    }else{
                        this.$message.error(res.data.column_name)
                    }
                })
            },
            getcolDet (){
                geteColuDet({id:this.editid}).then((res)=>{
                    if(res.code==='0'){
                        this.ruleForm = res.data
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>