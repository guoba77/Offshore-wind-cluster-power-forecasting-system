<template>
  <el-dialog :visible.sync="visible" :before-close="handleClose">
    <div style="font-size: 22px;padding-bottom:20px;color: white;text-align: center">{{titleText}}</div>
    <el-table ref="table" :data="dataList" height="400" size="small" border class="show">
      <el-table-column label="序号" width="150">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column property="time" label="时间点" width="150"></el-table-column>
      <el-table-column property="name" label="场站名" width="200"></el-table-column>
      <el-table-column property="type" label="类型" width="150">
        <template slot-scope="scope">
            <span v-text="getTypeText(scope.row.type)"></span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="异常原因">
        <template slot-scope="scope">
            <span v-html="getStatusHtml(scope.row.status)"></span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'focusDataShow',
  props: ['visible', 'title', 'quarter', 'dataList'],
  data() {
    return {
      gridData: [],
      dialogTableVisible: false
    }
  },
  computed: {
    titleText() {
      if (this.quarter) {
        return this.title + '(' + this.quarter + ')'
      } else {
        return this.title
      }
    }
  },
  watch: {
    '$route.fullPath': {
      handler: function(newV, oldV) {
        const table = this.$refs['table']
        if (table) {
          table.doLayout()
        }
      }
    }
  },
  updated() {
    const table = this.$refs['table']
    if (table) {
      table.doLayout()
    }
  },
  methods: {
    handleClose() {
      this.$emit('handClose', false)
    },
    getStatusHtml(status) {
      if (status === 0) {
        return '<span class="err-text">延迟上报</span>'
      } else if (status === 2) {
        return '<span class="err-text">未上报</span>'
      } else if (status === 3) {
        return '<span class="err-text">格式错误</span>'
      } else if (status === 4) {
        return '<span class="err-text">时长不足</span>'
      } else {
        return '<span class="err-text">还未上报</span>'
      }
    },
    getTypeText(type) {
      if (type === 1) {
        return '短期'
      } else if (type === 2) {
        return '超短期'
      } else {
        return '<未知类型>'
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .err-text{
  color: #ff4b4b !important
}
/deep/ .el-table--border::after{
  background-color: transparent;
}
/deep/ .el-dialog__title {
  line-height: 24px;
  font-size: 22px;
  color: white;
}
/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog {
  background: bottom;
}
/deep/ .el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  border-radius: 5px;
  background-position-y:9%;
  background-image: url("../../../../../assets/img/bg_box3.png");
  background-size: 100% 100%;
}
/deep/ .el-table__body tr:hover>td {
  background-color: rgba(0,0,0,0.1) !important;
  color: deepskyblue;
  cursor: default;
}
// 表格样式
/deep/ .el-table__body td {
  -webkit-transition: background-color .25s ease;
  transition: background-color .25s ease;
  text-align: center;
}
/deep/.el-table th.is-leaf {
  text-align: center;
}
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  //background-image: url("../../../../../assets/img/bj.png");
  background-image: url("../../../../../assets/img/data08.png");
  box-shadow: deepskyblue 0px 0px 15px inset;
  border: 0px solid deepskyblue;
  color: #999;
  border-radius: 5px;
}
/* 表格内背景颜色 */
/deep/ .el-table th {
  color: orange;
  background-color: transparent;
  border: 1px solid slategrey !important;
}
/deep/ .el-table tr {
  background-color: transparent;
  border: 1px solid slategrey;
}
/deep/ .el-table td {
  background-color: transparent;
  border: 1px solid slategrey;
  color: cyan;
}
</style>
