<template>
  <div>
     <div>
    <el-steps :active="1">
  <el-step title="选择商品分类"></el-step>
  <el-step title="填写商品信息"></el-step>
  <el-step title="填写商品属性"></el-step>
</el-steps>
    </div>
<div class="myPopover">
    <span>您最近使用的商品分类：</span>
    <el-input v-model="classification" placeholder="请输入内容"></el-input>
    <el-popover placement="right" width="200" trigger="hover" class="secoed">
      <span>选择二级分类</span>
      <div
        @click="secondClick(item.value)"
        v-for="item in second"
        :key="item.lable"
      >
        {{ item.value }}
      </div>

      <div slot="reference" class="firse_type">
        
        <ul>
          <li class="type_content">选择一级分类</li>
          <li
            @mouseenter="firstHover(item.value, index)"
            v-for="(item, index) in list"
            :key="item.lable"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </el-popover>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
       list: [
        {
          lable: '0',
          value: '青菜',
          children: [
            {
              lable: '00',
              value: '青菜-00',
            },
            {
              lable: '01',
              value: '青菜-01',
            },
            {
              lable: '02',
              value: '青菜-02',
            },
            {
              lable: '03',
              value: '青菜-03',
            },
          ],
        },
        {
          lable: '1',
          value: '白菜',
          children: [
            {
              lable: '10',
              value: '白菜-10',
            },
            {
              lable: '11',
              value: '白菜-11',
            },
            {
              lable: '12',
              value: '白菜-12',
            },
            {
              lable: '13',
              value: '白菜-13',
            },
          ],
        },
        {
          lable: '2',
          value: '生菜',
          children: [
            {
              lable: '20',
              value: '生菜-20',
            },
            {
              lable: '21',
              value: '生菜-21',
            },
            {
              lable: '22',
              value: '生菜-22',
            },
            {
              lable: '23',
              value: '生菜-23',
            },
          ],
        },
      ],
      second: [],
      firstBame: '',
      secondName: '',
    
    }
  },
  computed: {
    classification() {
      return `${this.firstBame}${this.secondName}`
    },
  },
  methods: {
    firstHover(val, index) {
      this.second = this.list[index]['children']
      this.firstBame = val
    },
    secondClick(val) {
      this.secondName = val
    },
  },
}
</script>

<style lang="less" scoped>
.firse_type{
.type_content{
  text-align: center;

}
ul{
  margin-top: 50px;
  li{
    text-align: center;
    line-height: 50px;
  }
}
}
  .first {
  display: flex;
  flex-direction: column;
  width: 300px;
}
ul {
  border: 1px solid #ccc;
  width: 200px;
}
li {
  border-bottom: 1px solid #ccc;
  height: 50px;
}
.myPopover {
  .secoed{
    
  }

}
</style>