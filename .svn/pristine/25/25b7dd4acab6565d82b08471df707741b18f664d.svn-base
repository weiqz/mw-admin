<template>
  <div>
    <Combox title="筛选查询"
            ico="ivu-icon ivu-icon-ios-search-strong"
            :isBorder="true">
      <template v-slot:right>
        <a class="sqsx"
           style=""><i class="el-icon-arrow-up"></i> 收起筛选</a>
        <el-button plain
                   size="mini">查询结果</el-button>
        <el-button plain
                   size="mini" @click="memberSearch">高级检索</el-button>
      </template>
      <template v-slot:center>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline"
                 style="margin:15px">
          <el-form-item label="用户账号">
            <el-input v-model="formInline.user"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="formInline.name"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker v-model="formInline.value1"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
    </Combox>
    <Combox title="数据列表"
            ico="ivu-icon ivu-icon-md-list"
            :isFoot="true"
            :isBorder="true">
      <template v-slot:right>
        <el-select v-model="value"
                   placeholder="赠送优惠券">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="seleValue"
                   placeholder="选择条数">
          <el-option v-for="item in option"
                     :key="item.value2"
                     :label="item.label"
                     :value="item.value2">
          </el-option>
        </el-select>
      </template>
      <template v-slot:center>
        <div class="table">
          <el-row>
            <el-col :span="24">

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
            <el-table-column label="用户ID"
                             width="140">
              <template slot-scope="scope">{{ scope.row.account }}</template>
            </el-table-column>
            <el-table-column prop="phone"
                             label="用户账号"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickname"
                             label="用户昵称"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="grade_name"
                             label="会员等级"
                             width="140"></el-table-column>
            <el-table-column prop="amount"
                             label="消费金额"
                             width="140"></el-table-column>
            <el-table-column label="订单数量"
                             width="120">
              <template slot-scope="scope">{{ scope.row.order_count }}</template>
            </el-table-column>

            <el-table-column prop="integral"
                             label="可用积分"
                             width="140"></el-table-column>

            <el-table-column prop="status"
                             label="是否启用">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status"
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
                           size="small">查看</el-button>
                <el-button type="text"
                           size="small"
                           >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>

      <template v-slot:foot>
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
      </template>
    </Combox>
    <el-dialog title="高级检索"
               :visible.sync="dialogVisible"
               width="30%">
      <memberSearch2></memberSearch2>
    </el-dialog>
  </div>
</template>
<script>
import {memberlist} from "../../api/members"
import memberSearch2 from '../../components/memberSearch'
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [
        {
          account: 1000001,
          phone: 22255522,
          nickname: 'kinglege',
          grade_name: '普通会员',
          amount: '￥2000.00',
          order_count: '10',
          status: true,
          integral: '10000',
        },
        {
          account: 1000001,
          phone: 22255522,
          nickname: 'kinglege',
          grade_name: '普通会员',
          amount: '￥2000.00',
          order_count: '10',
          status: true,
          integral: '10000',
        },
        {
          account: 1000001,
          phone: 22255522,
          nickname: 'kinglege',
          grade_name: '普通会员',
          amount: '￥2000.00',
          order_count: '10',
          status: true,
          integral: '10000',
        },
        {
          account: 1000001,
          phone: 22255522,
          nickname: 'kinglege',
          grade_name: '普通会员',
          amount: '￥2000.00',
          order_count: '10',
          status: true,
          integral: '10000',
        },
      ],


      currentPage4:1,
      option: [
        {
          value: '选项1',
          label: '10',
        },
        {
          value: '选项2',
          label: '20',
        },
      ],
      options: [
        {
          value: '选项1',
          label: '选中用户',
        },
        {
          value: '选项2',
          label: '全部用户',
        },
      ],
      value: '',
      value2: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      userData: {},
      seleValue: 10,
      formInline: {
        user: '',
        nickname: '',
      
        account:''
      },
    }

  },
    computed: {
    getmid () {
      return this.$store.getters.mid;
    }
  },
  components: { memberSearch2 },
  created(){
    this.addRequest()
  },
  methods: {
    addRequest (){
      this.formInline.cid = this.getmid
      this.formInline.page = this.currentPage4
      this.formInline.rows = this.seleValue
                memberlist(this.formInline).then((res) => {
                  console.log(res)
                    if(res.code==='0'){
                        this.$emit('uplist');
                    }
                })
            },
    memberSearch (v) {
      console.log(v)
      this.dialogVisible = true
    },
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
    supplier(){}
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
