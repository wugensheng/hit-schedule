<template>
  <div>
  <van-nav-bar
  title="课表"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="select">
  <el-select v-model="value" placeholder="请选择" @change="pageNumberChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
  <ve-table :border-y="true" :columns="columns" :table-data="tableData" :fixed-header="true" max-height="100%" style="width:100%" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      // page index
      pageIndex: 1,
      // page size
      pageSize: 6,
      options: [],
      value: 1,
      columns: [
        { field: 'period', key: 'a', title: '', align: 'center' },
        { field: 'mon', key: 'mon', title: '周一', align: 'center' },
        { field: 'tues', key: 'tues', title: '周二', align: 'center' },
        { field: 'wed', key: 'wed', title: '周三', align: 'center' },
        { field: 'thur', key: 'thur', title: '周四', align: 'center' },
        { field: 'fri', key: 'fri', title: '周五', align: 'center' },
        { field: 'sat', key: 'sat', title: '周六', align: 'center' },
        { field: 'sun', key: 'sun', title: '周日', align: 'center' }
      ],
      DB_DATA: []
    }
  },
  computed: {
    tableData () {
      const { pageIndex, pageSize } = this
      return this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        path: '/login'
      })
    },
    // page number change
    pageNumberChange (pageIndex) {
      this.pageIndex = this.value
    }
  },
  created () {
    this.$bus.$on('getTableData', (tableData) => {
      this.DB_DATA = tableData
    })
    this.$bus.$emit('setTableData')
    for (let i = 1; i <= 20; i++) {
      this.options.push({
        value: i,
        label: `第${i}周`
      })
    }
  }
}
</script>

<style scoped>
.select {
  text-align: center;
}
.el-select{
  width: 99% !important
}
</style>
