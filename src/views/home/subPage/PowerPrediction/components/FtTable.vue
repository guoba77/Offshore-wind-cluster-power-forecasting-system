<template>
  <el-dialog :visible="ftvisible" @close="close">
    <div style="font-size: 22px;padding-bottom:20px;color: white;text-align: center">方天短期预测当日详情</div>
    <el-table ref="table" height="400" :data="ftdataList" size="small" border class="show">
      <el-table-column label="序号" width="150">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="stationName" label="场站名" ></el-table-column>
      <el-table-column  label="是否已预测" >
        <template #default="{row}">
          <div :class="row.isPredicted?'green':'red'">
          {{row.isPredicted?'是':'否'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="predictedTime" label="预测发生时间" ></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default{
  props: {
    ftvisible: {
      type: Boolean,
      default: false
    },
    ftdataList: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.initTable()
  },
  watch: {
    'ftvisible': {
      handler: function(newV, oldV) {
        const table = this.$refs['table']
        if (table) {
          setTimeout(() => {
            table.doLayout()
          }, 0)
        }
      }
    }
  },
  methods: {
    initTable() {
      const table = this.$refs.table
      if (table) {
        if (this.ftvisible === true) {
          table.doLayout()
        }
      }
    },
    close() {
      this.$emit('update:ftvisible', false)
    }
  }
}
</script>
<style scoped lang="scss">
.red{
  color: red;
}
.green{
  color: chartreuse;
}
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
    font-size: 15px;
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
