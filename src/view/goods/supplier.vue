<template>
  <div>
    <div>
      <el-button size="medium">
        全部商品
        <span>(1000)</span>
      </el-button>
      <el-button size="medium">
        已上架
        <span style="color:red">(1000)</span>
      </el-button>
      <el-button size="medium">
        未上架
        <span style="color:red">(1000)</span>
      </el-button>
    </div>
    <div class="query">
      <el-row>
        <el-col :span="24" class="query_tit">
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
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm  content"
        >
          <el-form-item label="OE编号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="nember">
            <el-input v-model="ruleForm.nember"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="ruleForm.supplier"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark dataList">
            <div class="data_left">数据列表</div>
            <div class="data_right">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div></div
        ></el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        botooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="编号" width="120">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column
          prop="pro_img"
          label="商品图片"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="pro_name"
          label="商品名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="所属分类" width="120">
          <template slot-scope="scope">{{ scope.row.pro_type }}</template>
        </el-table-column>
        <el-table-column
          prop="pro_price"
          label="售价/货号"
          width="120"
        ></el-table-column>
        <el-table-column prop="data" label="标签" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.data" inactive-text="上架:">
            </el-switch>
            <el-switch
              style="display: block"
              v-model="scope.row.data1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              inactive-text="推荐:"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="120">
          <template slot-scope="scope">{{ scope.row.pro_sort }}</template>
        </el-table-column>
        <el-table-column
          prop="pro_sku"
          label="SKU库存"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="pro_sales"
          label="销量"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pro_time"
          label="创建时间"
          width="120"
        ></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block supplier_footer">
      <div class="supplier_fleft">
     

        <el-select v-model="value" placeholder="批量操作" class="supplaier">
          <el-option
            v-for="item in supplier"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-row style="margin-left:-74px"
          ><el-button>确定</el-button></el-row
        >
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
    <!-- <page></page> -->
  </div>
</template>

<script>
// import page from "../page/index"
export default {
  data() {
    return {
      currentPage4:0,      
      value1: true,
      ruleForm: {
        name: '',
        nember: '',
        supplier: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        supplier: [
          { required: true, message: '请选择供应商区域', trigger: 'change' },
        ],
        nember: [
          { required: true, message: '请输入OE编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
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
          pro_img: '../../assets/login_bg.png',
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          data1: true,
          pro_sort: 100,
          pro_sku: 100,
          pro_sales: 100,
          pro_time: '2020 - 6 - 1',
          // name: '王小虎',
          // address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          number: 1000001,
          pro_img: '../../assets/login_bg.png',
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          data1: true,
          pro_sort: 100,
          pro_sku: 100,
          pro_sales: 100,
          pro_time: '2020 - 6 - 1',
        },
        {
          number: 1000001,
          pro_img: '../../assets/login_bg.png',
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          data1: true,
          pro_sort: 100,
          pro_sku: 100,
          pro_sales: 100,
          pro_time: '2020 - 6 - 1',
        },
        {
          number: 1000001,
          pro_img: '../../assets/login_bg.png',
          pro_name: '全包围丝圈双层汽车脚垫专车专用（黑色五座）',
          pro_type: '内饰精品>脚垫',
          pro_price: '售价：¥100.00,货号：N07862',
          date: true,
          data1: true,
          pro_sort: 100,
          pro_sku: 100,
          pro_sales: 100,
          pro_time: '2020 - 6 - 1',
        },
      ],
      multipleSelection: [],
    }
  },
  // components:{
  //   page
  // },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
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
      justify-content: space-around;
      align-items: center;
      margin-top: 30px;
    }
  }
}
</style>
