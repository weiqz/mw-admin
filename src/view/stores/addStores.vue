<template>
  <div>
    <Combox title="添加门店"
            :isFoot="true"
            :isBorder="true">
      <template v-slot:center>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm content">
          <el-form-item label="门店名称"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="门店类型"
                        prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="社区店"></el-radio>
              <el-radio label="授权店"></el-radio>
              <el-radio label="改装店"></el-radio>
              <el-radio label="技术中心"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="美容项目"
                        prop="region">
            <el-radio-group v-model="ruleForm.region">
              <el-radio label="打蜡"></el-radio>
              <el-radio label="贴膜"></el-radio>
              <el-radio label="洗车"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="保养服务"
                        prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="门店封面"
                        prop="cover">
            <el-input v-model="ruleForm.cover"
                      type="primary"
                      icon="el-icon-upload"><i class="el-icon-delete"></i></el-input>
          </el-form-item>
          <el-form-item label="营业时间"
                        required>
            <el-col :span="3">
              <el-form-item prop="date1">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line"
                    :span="1">-</el-col>
            <el-col :span="3">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间"
                                v-model="ruleForm.date2"
                                style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="技师人数"
                        prop="people">
            <el-input v-model="ruleForm.people"></el-input>
          </el-form-item>
          <el-form-item label="门店电话"
                        prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>

            <el-form-item label="启用"
                        prop="enable">
            <el-switch v-model="ruleForm.enable"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">提交</el-button>
 
          </el-form-item>
        </el-form>
      </template>
    </Combox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        resource: '',
        delivery: false,
        enable:false,
        cover: '',
        region: '',
        tel: '',
        people: '',
        date1: '',
        date2: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择门店类型', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择门店类型', trigger: 'change' }
        ],
        cover: [
          { required: true, message: '请上传门店封面', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        tel: [
          { type: 'number', required: true, message: '请输入电话', }
        ],
        people: [
          { type: 'number', required: true, message: '技师人数', }
        ],
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  margin: 30px;
}
.line {
  text-align: center;
}
</style>