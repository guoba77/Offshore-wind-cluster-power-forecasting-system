<template>
  <div
    class="ReportingStatus"
    v-loading="loading"
    element-loading-text="Loading..."
  >
    <div class="statusSel">
      <span class="title">日期:</span><span>{{ day }}</span>
      <span class="title">当日短期漏报:</span><span>{{ shortMissCount }}</span>
      <span class="title">当日超短期漏报:</span
      ><span>{{ ultraShortMissCount }}</span>
      <!-- <el-date-picker
          v-model="value1"
          type="date"
          size="small"
          placeholder="选择日期">
      </el-date-picker>
      <el-button style="background-color: rgba(0,0,0,0);width: 100px;
            font-size: 16px;box-shadow: deepskyblue 0px 0px 15px inset;
            border: 0px solid deepskyblue;" type="primary" size="small" plain>查询</el-button> -->
    </div>
    <div style="width: 100%; display: flex">
      <el-table
        :data="tableData1"
        ref="table1"
        :height="height"
        class="statusTable"
      >
        <el-table-column prop="seq" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="场站名">
          <template slot-scope="scope">
            <span v-if="scope.row.name !== null" class="table-text">{{
              scope.row.name
            }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="power" label="装机容量(MW)">
          <template slot-scope="scope, text">
            <span v-if="scope.row.power !== null" class="table-text">{{
              scope.row.power
            }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="status1" label="短期上报状态">
          <template slot-scope="scope, text">
            <span v-if="scope.row.status1 === 1" class="table-text">
              <img
                src="../../../../assets/images/电压圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <span v-else class="table-text">
              <img
                src="../../../../assets/images/温度圆点.png"
                width="20px"
                height="20px"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status2"
          width="200"
          :label="'超短期(' + quarter + ')上报状态'"
        >
          <template slot-scope="scope, text">
            <span v-if="scope.row.status2 === 1" class="table-text">
              <img
                src="../../../../assets/images/电压圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <span v-else class="table-text">
              <img
                src="../../../../assets/images/温度圆点.png"
                width="20px"
                height="20px"
              />
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData2"
        ref="table2"
        :height="height"
        class="statusTable"
      >
        <el-table-column prop="seq" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="场站名">
          <template slot-scope="scope">
            <span v-if="scope.row.name !== null" class="table-text">{{
              scope.row.name
            }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="power" label="装机容量(MW)">
          <template slot-scope="scope, text">
            <span v-if="scope.row.power !== null" class="table-text">{{
              scope.row.power
            }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="status1" label="短期上报状态">
          <template slot-scope="scope, text">
            <span v-if="scope.row.status1 === 1" class="table-text">
              <img
                src="../../../../assets/images/电压圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <span v-else class="table-text">
              <img
                src="../../../../assets/images/温度圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <!-- <span v-else>--</span> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="status2"
          width="200"
          :label="'超短期(' + quarter + ')上报状态'"
        >
          <template slot-scope="scope, text">
            <span v-if="scope.row.status2 === 1" class="table-text">
              <img
                src="../../../../assets/images/电压圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <span v-else class="table-text">
              <img
                src="../../../../assets/images/温度圆点.png"
                width="20px"
                height="20px"
              />
            </span>
            <!-- <span v-else>--</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { CurrentUploadView } from '@/api/api'

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      value1: '',
      value: '1',
      value2: '1',
      value3: '1',
      radio: 1,
      tableData1: [],
      tableData2: [],
      day: '',
      quarter: '00:00',
      shortMissCount: 0,
      ultraShortMissCount: 0,
      dom1: null,
      dom2: null,
      flag: null,
      timer: null
    }
  },
  computed: {
    height() {
      return this.$store.state.app.height - 150 + 'px'
    }
  },
  created() {
    this.getUploadView()
    // 每隔1分钟刷新数据
    this.timer = setInterval(() => {
      this.getUploadView()
    }, 60000)
  },
  mounted() {
    const that = this
    that.dom1 = that.$refs.table1.bodyWrapper
    that.dom2 = that.$refs.table2.bodyWrapper
    // that.dom1.addEventListener("mouseover", (e) => {
    //   this.flag = false; // 此处的flag判断是否主动滚动了当前table
    // })
    that.dom1.addEventListener('mouseover', (e) => {
      that.flag = false // 此处的flag判断是否主动滚动了当前的table
    })
    that.dom2.addEventListener('mouseover', (e) => {
      this.flag = true // 此处的flag判断是否主动滚动了当前table
    })
  },
  watch: {
    '$route.fullPath': {
      handler: function(newV, oldV) {
        const table1 = this.$refs['table1']
        const table2 = this.$refs['table2']
        if (table1) {
          table1.doLayout()
        }
        if (table2) {
          table2.doLayout()
        }
      }
    },
    flag(value) {
      this.listenerScroll(value)
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    listenerScroll() {
      const that = this
      if (that.flag === true) {
        // 2滑动  赋值给1  true
        that.dom2.addEventListener('scroll', () => {
          if (this.flag) { // 这个判断很重要
            that.dom1.scrollTop = that.dom2.scrollTop
          }
        })
      } else {
        // 1滑动赋值给2
        that.dom1.addEventListener('scroll', () => {
          if (!this.flag) { // 这个判断很重要
            that.dom2.scrollTop = that.dom1.scrollTop
          }
        })
      }
    },
    getUploadView() {
      this.loading = true
      CurrentUploadView().then(res => {
        this.tableData1 = []
        this.tableData2 = []
        this.quarter = res.data.quarter
        this.day = res.data.day
        this.shortMissCount = res.data.shortMissCount
        this.ultraShortMissCount = res.data.ultraShortMissCount
        const list = res.data.list
        const splitIndex = Math.ceil(list.length / 2) - 1
        res.data.list.forEach((item, index) => {
          const data = {
            seq: index + 1,
            name: item.name,
            power: item.capacity,
            status1: item.status1,
            status2: item.status2
          }
          if (index <= splitIndex) {
            this.tableData1.push(data)
          } else {
            this.tableData2.push(data)
          }
        })
        this.loading = false
      }).catch(s_err => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.ReportingStatus {
  width: 100%;
  height: 100%;
  //background-image: url("../../../../assets/img/bg_body.jpg");
  background-image: url("../../../../assets/img/data08.png");
  //box-shadow: 0px 0px 5px #888888;
  .statusSel {
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding: 0 15px;
    color: white;
    background-size: 100% 100%;
    margin: 0 10px;
    border-radius: 5px;
    background-position-y: 9%;
    background-image: url("../../../../assets/img/bg_box3.png");
    span {
      font-size: 18px;
      font-weight: bold;
      padding-left: 10px;
    }
    select {
      width: 100px;
    }
    button {
      width: 80px;
      font-size: 14px;
      margin-left: 10px;
    }
    .title {
      color: orange;
    }
  }
  .statusTable {
    margin: 10px;
    width: calc(50% - 20px);
  }
}
/deep/ .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: deepskyblue;
  font-size: 15px;
  cursor: pointer;
}
/deep/ .el-table__body td {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
  text-align: center;
}
/deep/.el-table th.is-leaf {
  //border-bottom: 1px solid #EBEEF5;
  text-align: center;
}
/deep/ .el-input--small .el-input__inner {
  box-shadow: deepskyblue 0px 0px 15px inset;
  border: 0px solid deepskyblue;
  height: 32px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
// 表格样式
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
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
