<template>
  <div class="container userinfo_seting">
    <div class="photo">
      <img src="../../assets/index/u1727.png"
           alt="">
      <div class="photo_mess">上传头像</div>
    </div>
    <el-form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          label-width="140">
      <el-form-item label="用户名"
                prop="name">
        <el-input v-model="formValidate.name"
                 placeholder="请输入用户名"
                 disabled></el-input>
      </el-form-item>
      <el-form-item label="旧密码"
                prop="passwd">
        <el-input type="password"
                 v-model="formValidate.passwd"
                 placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                prop="passnewwd">
        <el-input type="password"
                 v-model="formValidate.passnewwd"
                 placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                prop="passwdCheck">
        <el-input type="password"
                 v-model="formValidate.passwdCheck"
                 placeholder="确认新输入密码"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary"
                @click="handleSubmit('formValidate')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setpass } from '../../api/setPassword'
export default {
  data () {
    let checkNewpass = (rule,value,callback) => {
        if (this.formValidate.passnewwd !== value) {
          callback(new Error('确认密码与新密码不一致'))
        }else{
          callback()
        }
    };
    return {
      formValidate: {
        name: '',
        passwd: '',
        passnewwd: '',
        passwdCheck: '',
      },
      ruleValidate: {
        passwd: [
          { required: true, message: '初始密码不能为空', trigger: 'blur' }
        ],
        passnewwd: [
          { required: true,message: '新密码不能为空', trigger: 'blur' },
           { min: 6, message: '密码不能少于6位数', trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: checkNewpass,trigger: 'blur' }
        ],
      },

    }
  },
  created () {
    const name = JSON.parse(localStorage.getItem('userinfo')).user_name;
    this.formValidate.name = name;
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {

        if (valid) {
          let obj = {
            id: JSON.parse(localStorage.getItem('userinfo')).manager_id,
            password: this.formValidate.passwd,
            new_password: this.formValidate.passwdCheck
          };
          setpass(obj).then(res => {
            var _this = this;
            if (res.code === "0") {
              this.$message({
                type:'success',
                message:res.data,
                onClose:function (){
                  _this.$router.push('/login')
                }
              });
              
            }
          })

        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 400px;
  margin: 200px 30% auto;
  .photo {
    width: 100px;
    height: 100px;
    margin-bottom: 50px;
    margin-left: 197px;
    .img {
      width: 100px;
      height: 100px;
    }
  }
  .photo_mess {
    font-size: 12px;
    color: #1abc9c;
    text-align: center;
  }
}
.ivu-btn {
  margin-left: 55px;
  margin-top: 50px;
}
</style>