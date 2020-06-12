<template>
    <div>
        <div style="margin:40px 0 40px 100px">
          

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-if="isModule">
                <el-form-item label="所属子栏目">
                    <el-input v-model="toCol" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="模块名称" prop="column_name">
                    <el-input v-model="ruleForm.column_name"></el-input>
                </el-form-item>
                <el-form-item label="模块路径" prop="column_path">
                    <el-input v-model="ruleForm.column_path"></el-input>
                </el-form-item>
                <!--
                <el-form-item label="子栏目图标" prop="icon_path">
                    <el-input v-model="ruleForm.icon_path"></el-input>
                </el-form-item> -->
                <el-form-item label="模块排序" prop="column_position">
                    <el-input v-model="ruleForm.column_position"></el-input>
                </el-form-item>
            </el-form>

             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-else>
                <el-form-item label="所属根栏目">
                    <el-input v-model="toCol" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="子栏目名称" prop="column_name">
                    <el-input v-model="ruleForm.column_name"></el-input>
                </el-form-item>
                
                <!-- 
                <el-form-item label="子栏目图标" prop="icon_path">
                    <el-input v-model="ruleForm.icon_path"></el-input>
                </el-form-item> -->

                <el-form-item label="子栏目排序" prop="column_position">
                    <el-input v-model="ruleForm.column_position"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { addColumn, updateColu, geteColuDet} from '../../api/permissions'
    export default {
        props:{
            currcol:Object,
            isModule:Boolean,
            modid:Number
        },
        data (){
            return {
                ruleForm: {
                        column_name: '',
                        column_path: '',
                        icon_path: '',
                        column_position: '',
                },
                rules: {
                        column_name: [
                            { required: true, message: '请输入名称'}
                        ],
                        column_path: [
                            { required: true, message: '请输入路径'}
                        ]
                }
            }
        },
        created(){
            if(this.modid){
                this.getChildColDet()
            }
        },
        watch:{
            modid:function (){
                this.getChildColDet()
            }
        },
        computed: {
            toCol (){
                return this.currcol.column_name
            }
        },
        methods:{
            initData2(){
                Object.assign(this.$data, this.$options.data())
            }, 
            addChildcolu (){
                let obj = this.ruleForm;
                obj.parent_id = this.currcol.id
                if(this.isModule){
                    obj.actions = 'y'
                }else{
                    obj.actions = 'n'
                }
                addColumn(obj).then((res) => {
                    if(res.code==='0'){
                        this.$emit('uplist');
                        this.initData2()
                    }else{
                        this.$message.error(res.data.column_name)
                    }
                })
            },
            getChildColDet(){
                geteColuDet({id:this.modid}).then((res)=>{
                    if(res.code==='0'){
                        this.ruleForm = res.data
                    }
                })
            },
            editRequest (){
                let obj = this.ruleForm;
                if(this.isModule){
                    obj.actions = 'y'
                }else{
                    obj.actions = 'n'
                }
                updateColu(obj).then((res) => {
                    if(res.code==='0'){
                        this.$emit('uplist');
                    }else{
                        this.$message.error(res.data.column_name)
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>