<template>
  <div>
    <div class="query">
      <el-row>
        <el-col :span="24"
                class="query_tit">
          <div class="grid-content bg-purple-dark query_tlt_content">
            <div class="tit_left">筛选查询</div>
            <div class="tit_right">
              <span class="r1">查询结果</span>
              <span class="r1">高级检索</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="query_content">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm  content">
          <el-form-item label="输入搜索"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类"
                        prop="region">
            <el-select v-model="ruleForm.region"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark dataList">
            <div class="data_left">数据列表</div>
            <div class="data_right">
              <el-row>
                <el-button>添加</el-button>
              </el-row>
              <el-select v-model="value"
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table ref="multipleTable"
                :data="tableData"
                border
                botooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column label="编号"
                         width="140">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="username"
                         label="用户昵称"
                         width="140"></el-table-column>
        <el-table-column prop="pro_name"
                         label="门店名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="pro_address"
                         label="地址"
                         width="140"></el-table-column>
        <el-table-column label="评价"
                         width="160">
          <div class="block">
            <el-rate v-model="value2"></el-rate>
          </div>
        </el-table-column>

        <el-table-column prop="pro_sku"
                         label="车型"
                         width="140"></el-table-column>
        <el-table-column prop="starrating"
                         label="评价时间"
                         width="140"></el-table-column>
        <el-table-column prop="data"
                         label="是否显示"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch style="display: block"
                       v-model="scope.row.data"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="address"
                         label="操作"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block supplier_footer">
      <div class="supplier_fleft">
        <el-select v-model="value"
                   placeholder="批量操作"
                   class="supplaier">
          <el-option v-for="item in supplier"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-row style="margin-left:-74px">
          <el-button>确定</el-button>
        </el-row>
      </div>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[100, 200, 300, 400]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400"></el-pagination>
    </div>
    <!-- <page></page> -->
  </div>
</template>

<script>
// import page from "../page/index"
export default {
  data () {
    return {
      value2: null,
      currentPage4: 0,
      value1: true,
      ruleForm: {
        name: '',

        region: '',
      },
      rules: {
        pro_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择供应商区域', trigger: 'change' },
        ],
      },
      options: [
        {
          value: '选项1',
          label: '10',
        },
        {
          value: '选项2',
          label: '20',
        },
        {
          value: '选项3',
          label: '30',
        },
      ],
      supplier: [
        {
          value: '选项1',
          label: '上架商品',
        },
        {
          value: '选项2',
          label: '下架商品',
        },
        {
          value: '选项3',
          label: '30',
        },
      ],
      value: '',
      tableData: [
        {
          number: 1000001,
          username: 'biubiu',
          pro_name: '魔界线下一号门店',
          pro_address: '包河区沈阳路17号',
          evaluate: '工厂店、快修店',
          starrating: '2020-3-3 14：00',
          pro_sku: '哈弗H2',
        },
        {
          number: 1000001,
          username: 'biubiu',
          pro_name: '魔界线下一号门店',
          pro_address: '包河区沈阳路17号',
          evaluate: '内饰精品>脚垫',
          starrating: '2020-3-3 14：00',
          pro_sku: '哈弗H2',
        },
        {
          number: 1000001,
          username: 'biubiu',
          pro_name: '魔界线下一号门店',
          pro_address: '包河区沈阳路17号',
          evaluate: '内饰精品>脚垫',
          starrating: '2020-3-3 14：00',
          pro_sku: '哈弗H2',
        },
        {
          number: 1000001,
          username: 'biubiu',
          pro_name: '魔界线下一号门店',
          pro_address: '包河区沈阳路17号',
          evaluate: '内饰精品>脚垫',
          starrating: '2020-3-3 14：00',
          pro_sku: '哈弗H2',
        },
      ],
      multipleSelection: [],
    }
  },
  // components:{
  //   page
  // },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange () { },
    handleSizeChange () { },
  },
}
</script>

<style lang="less" scoped>
.table {
  margin-top: 20px;
  .dataList {
    background-color: #e4e4e4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .data_left {
      padding: 10px 0px 0 30px;
    }
    .data_right {
      display: flex;
      padding: 10px 30px 10px 0;
    }
  }
}
/deep/.el-table td,
.el-table th {
  text-align: center;
}
.supplier_footer {
  .supplier_fleft {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supplaier {
  margin-left: 30px;
  /deep/.el-input {
    width: 55%;
  }
}
.block {
  text-align: right;
  margin: 20px 0;
}
.query {
  margin-top: 20px;
  border: 1px solid #e4e4e4;
  .query_tit {
    background-color: #f2f2f2;
    .query_tlt_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tit_left {
        padding: 10px 0 10px 30px;
      }
      .tit_right {
        padding-right: 30px;
        .r1 {
          display: inline-block;
          background-color: #fff;
          width: 80px;
          height: 30px;
          border: 1px solid #e4e4e4;
          color: #333;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
  .query_content {
    .content {
      display: flex;
      margin-top: 30px;
    }
  }
}
</style>
