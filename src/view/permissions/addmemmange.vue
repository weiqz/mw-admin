<template>
    <div>
        <Combox :title="title" ico="ivu-icon ivu-icon-md-list" :isBorder="true">
            <template v-slot:center>
                <div class="memForm_box" v-loading="formload">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="成员账号" prop="user_name" required>
                    <el-input v-model="ruleForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="成员姓名" prop="full_name" required>
                    <el-input v-model="ruleForm.full_name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email" required>
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile" required>
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="department_id" required>
                    <el-select v-model="ruleForm.department_id" filterable placeholder="请选择部门">
                        <el-option v-for="item in department_sele" :key="item.id" :label="item.department_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="登录密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.password"></el-input> <span style="color:rgb(202, 202, 202)">密码可为空，初始密码123456</span>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpass">
                    <el-input type="password" v-model="ruleForm.checkpass"></el-input>
                </el-form-item>

                <el-form-item label="备注信息" prop="user_description">
                    <el-input type="textarea" v-model="ruleForm.user_description"></el-input>
                </el-form-item>
                <el-form-item label="" prop="is_admin">
                    <el-checkbox v-model="ruleForm.is_admin" label="是否为部门管理员" name="type"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="subload">提交</el-button>
                </el-form-item>
                </el-form>
                </div>
            </template>
        </Combox>
    </div>
</template>

<script>
import { addUser } from '../../api/user'
import { updateUser } from '../../api/user'
import { userdetail } from '../../api/user'
import { getdivimange } from '../../api/divimange'
    export default {
        data(){
            var checkEmail = (rule,value,callback) => {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(reg.test(value)){
                    callback()
                }else{
                    callback(new Error('邮箱格式不正确，请重新输入'))
                }
            };
            var checkPhone = (rule,value,callback) => {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(myreg.test(value)){
                    callback()
                }else{
                    callback(new Error('手机号格式不正确，请重新输入'))
                }
            }
            return {
                title:'添加成员',
                subload:false,
                formload:true,
                ruleForm: {
                    user_name: '',
                    full_name: '',
                    email: '',
                    mobile: '',
                    is_admin:false,
                    department_id: '请选择部门',
                    password: '',
                    checkpass: '',
                    user_description: '',
                },
                department_sele:[],
                rules: {
                    user_name: [
                        { required: true, message: '请输入登录名', trigger: 'blur' }
                    ],
                    full_name: [
                        { required: true, message: '请输入中文名', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkPhone,  trigger: 'blur' }
                    ],
                    department_id: [
                        { required: true, message: '请选择所属部门', trigger: 'blur' }
                    ]
                    
                }
            }
        },
        inject:['reloads'],
        watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "getuserDet"
        },
        created (){
            this.getuserDet()
            this.getdivimList()
        },
        computed: {
            getuserid (){
                return this.$route.params.userId
            },
            getmid(){
                return this.$store.getters.mid;
            }
        },
        methods:{
            getdivimList(){
                getdivimange({
                    cid:this.getmid,
                    type:'select'
                }).then((res)=>{
                    if(res.code==='0'){
                        this.department_sele = res.data.rows;
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            getuserDet (){
                const i = this.getuserid;
                if(i!=='0'){
                    this.title = '编辑成员';
                    userdetail(
                        {id:this.$route.params.userId}
                    ).then((res)=>{
                    if(res.code === '0'){
                        this.formload = false;
                        res.data.is_admin = res.data.is_admin===1;
                        this.ruleForm = res.data;
                    }
                    })
                }else{
                    this.title = '添加成员';
                    this.formload = false;
                }
            },
            submitForm(formName) {
                this.subload = true;
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = Object.assign({},this.ruleForm);
                    obj.is_admin = obj.is_admin ? 1 : 0;
                    if(this.getuserid==='0'){
                        addUser(obj).then((res) => {
                            if(res.code!=='0'){
                                 this.subload = false;
                                 this.$message.error(res.data.user_name)
                            }else{
                                this.reloads()
                            }
                        })
                    }else{
                        updateUser(obj).then((res) => {
                            if(res.code==='0'){
                                this.subload = false;
                                this.$router.go(-1)
                            }else{
                                this.subload = false;
                                this.$message.error(res.data.user_name)
                            }
                        })
                    }
                } else {
                    return false;
                }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
.memForm_box{
    width: 500px;
    margin: 25px 0;
    margin-left: 80px;
    .el-input__inner{
        width: 75%;
    }
}
</style>