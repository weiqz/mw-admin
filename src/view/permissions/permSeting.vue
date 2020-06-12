<template>
  <div>
          <Combox :title=title ico="ivu-icon ivu-icon-md-list" :isFoot="false" :isBorder="true">
            <template v-slot:right></template>
            
            <template v-slot:center>  
                <div class="authBox">
                    <div class="top_act">
                        <table class="auth_table" border="0" cellpadding="0" cellspacing="0">
                            <tr style="background:#eee" class="bold-font">
                                <td width="180">子栏目名称</td>
                                <td width="210">模块名称</td>
                                <td align="left">操作权限</td>
                            </tr>
                            <tbody v-for="colu in rows" :key="colu.id">
                            <tr>
                                <td colspan="3" class="bold-font">
                                 {{ colu.column_name }}
                                </td>
                            </tr>
                            <tr v-for="chil_colum in colu.children" :key="chil_colum.id">
                                <td rowspan="1">
                                   {{ chil_colum.column_name }}
                                </td>
                                <td colspan="2" style="padding:0;">
                                    <table class="mod_table" border="0" cellpadding="0" cellspacing="0">
                                        <tr v-for="child_mod in chil_colum.children" :key="child_mod.id">
                                            <td width="210" class="mod_column">
                                              {{ child_mod.column_name }}
                                            </td>
                                            <td class="left_align" style="padding:0;">
                                              <table class="act_table" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                  <td width="120" v-for="act in child_mod.actions" :key="act.id">
                                                     <el-checkbox v-model="act.checked">{{ act.action_name }}</el-checkbox>
                                                  </td>
                                                </tr>
                                                  
                                              </table>
                                            </td>
                                        </tr>
                                       
                                    </table>
                                </td>                   
                            </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </template>
        </Combox>
        <div class="checkAll">
          <el-checkbox v-model="allCheck" @change="checkAllChange">选择全部</el-checkbox>
        </div>
        <div style="margin-top:30px;text-align:center">
           <el-button type="primary" size="medium" @click="save">保存</el-button>
        </div>
  </div>
</template>

<script>
import { getDepartPermi } from '../../api/permissions'
import { updateDepartPermi } from '../../api/permissions'
export default {
  data () {
    return {
      allCheck:false,
      title: "当前部门:",
      rows: [],
      action_ids:[]
    }
  },
  computed: {
    getId (){
      return this.$route.params.id;
    },
    getmid(){
                return this.$store.getters.mid;
    },
  },
  created(){
    this.getpermiList();
  },
  methods:{
    getpermiList (){
      getDepartPermi({
        did:this.getId,
        cid:this.getmid
      }).then((res) => {
        console.log(res)
        let list = this.filterArr(res.data.rows,'isBool');
        console.log(list)
        this.rows = list;
      })
    },
    save(){
      let list = JSON.parse(JSON.stringify(this.rows));
      list = this.filterArr(list);
      let arrs = this.mapIdArr(list,0);
      console.log(arrs)
      updateDepartPermi({
        did:this.getId,
        action_ids:this.action_ids
      }).then(() => {
        this.action_ids=[]
        this.getpermiList()
      })
    },
    mapIdArr(arr,pid){
      arr.forEach((n) => {
        if(pid!==0){
          n.act_id = pid + "_" + n.id;
          if(n.action_name&&n.checked==='y'){
            this.action_ids.push(n.act_id);
          }
        }else{
          n.act_id = n.id;
        }
        if(n.children&&n.children.length>0 || n.actions&&n.actions.length>0){
          this.mapIdArr(n.children || n.actions,n.act_id)
        }
      })
      return this.action_ids
    },
    filterArr(arr,s){
      let y,o,fy,fn;
      if(s==='isBool'){
        y = 'y';
        o = 'n';
        fy = true;
        fn = false;
      }else{
        y = true;
        o = false;
        fy = 'y';
        fn = 'n';
      }
      arr.forEach((n) => {
        if(n.checked === y){
          n.checked = fy
        }
        if(n.checked === o ||n.checked === undefined){
          n.checked = fn
        }
        if(n.children&&n.children.length>0 || n.actions&&n.actions.length>0){
          this.filterArr(n.children || n.actions,s)
        }
      })
      return arr
    },
    checkChange(item,f){
      this.mapChecked(item,f)
    },
    mapChecked(item,f){
      if(item.children&&item.children.length>0){
        item.children.forEach((n) => {
          n.checked = f;
          this.mapChecked(n,f)
        })
      }
      if(item.actions&&item.actions.length>0){
        item.actions.forEach((n) => {
          n.checked = f;
        })
      }
    },
    checkAllChange(value){
      console.log('选择全部',value)
      this.rows.forEach((n) => {
        this.checkChange(n,value)
      })
    }
  }
}
</script>

<style lang="less" scoped>
 .authBox{
        margin: 40px;
        border: 1px solid #ddd;
        border-right: 0;
        border-top: 0;
    }
    .auth_table{
        width: 100%;

        td{
            padding: 8px 0;
            font-size: 14px;
            text-align: center;
            border-top: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }
        td.left_align{
             text-align: left;
             span{
                 padding: 3px 5px;
                 color: #888;
                 background: #f3f3f3;
                 margin-left: 5px;
             }
        }
        table.mod_table,table.act_table{

            tr:first-child{
                td{
                    border-top: 0;
                }
            }
        }
        table.mod_table{
          width: 100%;
          tr{
                td:last-child{
                    border-right: 0;
                }
            }
        }
    }
    td.mod_column {
    }
    .checkAll{
    padding: 10px 0;
    background: #f7f7f7;
    text-align: center;
    border: 1px solid #e6e6e6;
    }
</style>