<template>
  <div>

    <div class="table">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark dataList">
            <div class="data_left">数据列表</div>
            <div class="data_right">
              <el-row>
                <el-button>添加</el-button>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table ref="multipleTable"
                :data="tableData"
                border>

        <el-table-column label="编号"
                         width="140">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column prop="pro_name"
                         label="分类名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="类别"
                         width="120">
          <template slot-scope="scope">{{ scope.row.pro_type }}</template>
        </el-table-column>

        <el-table-column prop="pro_price"
                         label="级别"
                         width="140"></el-table-column>

        <el-table-column prop="pro_sku"
                         label="商品数量"
                         width="80"></el-table-column>
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
        <el-table-column prop="pro_sort"
                         label="排序"
                         width="140"></el-table-column>
        <el-table-column prop="address"
                         label="设置"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">新增下级</el-button>
            <el-button type="text"
                       size="small">查看下级</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         label="操作"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">还原</el-button>
            <el-button type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">

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
      currentPage4:0,
      value1: true,
      ruleForm: {
        name: '',
        nember: '',
        region: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        nember: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],

      },
      tableData: [
        {
          number: 1000001,
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          pro_sku: 100,
          pro_sort: 1,
        },
        {
          number: 1000001,
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          pro_sku: 100,
          pro_sort: 1,
        },
        {
          number: 1000001,
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          pro_sku: 100,
          pro_sort: 1,
        },
        {
          number: 1000001,
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          pro_sku: 100,
          pro_sort: 1,

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
    handleCurrentChange(){

    },
    handleSizeChange(){

    }
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
      padding: 10px 30px 10px 0;
    }
  }
}
/deep/.el-table td,
.el-table th {
  text-align: center;
}
/deep/.has-gutter {
  /deep/.el-table td,
  .el-table th {
    text-align: center;
  }
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
</style>
