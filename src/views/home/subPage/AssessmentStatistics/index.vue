<template>
  <div
    class="AssessmentStatistics"
    v-loading="loading"
    element-loading-text="Loading..."
  >
    <div class="statisticsSel">
      <span>场站：</span>
      <el-select
        v-model="value"
        filterable
        clearable
        size="small"
        style="width: 150px"
        @change="onSel"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>日期范围：</span>
      <el-date-picker
        v-model="value2"
        type="month"
        size="small"
        placeholder="请选择月份"
      >
      </el-date-picker>
      <el-button
        @click="queryData"
        style="
          background-color: rgba(0, 0, 0, 0);
          width: 100px;
          font-size: 14px;
          box-shadow: deepskyblue 0px 0px 15px inset;
          border: 0px solid deepskyblue;
        "
        type="primary"
        size="small"
        plain
        >查询</el-button
      >
    </div>
    <!-- :default-sort="{ prop: 'date', order: 'descending' }" -->
    <div v-if="tableShow" style="padding: 35px 10px 0" class="row-table">
      <el-table
        ref="table1"
        :default-sort="orderData"
        @sort-change="changeSort"
        :data="tableData"
        :height="tableHeight"
        @row-click="setCurrentRow"
        size="small"
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="场站名"></el-table-column>
        <el-table-column prop="date" label="月份"></el-table-column>
        <el-table-column label="短期预测">
          <el-table-column
            prop="c2"
            label="漏报次数"
            :sort-orders="['descending', 'ascending', null]"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-html="getNumHtml(scope.row.c2)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="c1" sortable="custom" label="不合格点数">
            <template slot-scope="scope">
              <span v-html="getNumHtml(scope.row.c1)"></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="超短期预测">
          <el-table-column prop="c4" sortable="custom" label="漏报次数">
            <template slot-scope="scope">
              <span v-html="getNumHtml(scope.row.c4)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="c3" sortable="custom" label="不合格点数">
            <template slot-scope="scope">
              <span v-html="getNumHtml(scope.row.c3)"></span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div v-else class="statisticsCon">
      <div class="con-table row-table">
        <div class="con-text">
          <span style="color: orange; padding-right: 5px">{{
            selStationName
          }}</span
          >在
          <span data-v-d24063ce="" style="color: orange; padding-right: 5px">{{
            selMonth
          }}</span
          >的每日考核统计
        </div>
        <el-table
          ref="table2"
          :data="tableData2"
          :height="tableHeight"
          @row-click="setCurrentRow2"
          size="small"
          class="fileTable"
        >
          <el-table-column prop="date" label="考核日期"></el-table-column>
          <el-table-column label="短期预测">
            <el-table-column prop="c2" label="漏报次数">
              <template slot-scope="scope">
                <span v-html="getNumHtml(scope.row.c2)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="c1" label="不合格点数">
              <template slot-scope="scope">
                <span v-html="getNumHtml(scope.row.c1)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="c5" label="不合格点数(方天)">
              <template slot-scope="scope">
                <span v-html="getNumHtml(scope.row.c5)"></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="超短期预测">
            <el-table-column prop="c4" label="漏报次数">
              <template slot-scope="scope">
                <span v-html="getNumHtml(scope.row.c4)"></span>
              </template>
            </el-table-column>
            <el-table-column prop="c3" label="不合格点数">
              <template slot-scope="scope">
                <span v-html="getNumHtml(scope.row.c3)"></span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="con-table">
        <div class="con-text">
          <span style="color: orange; padding: 0 5px">{{ selStationName }}</span
          >在 <span style="color: orange; padding-right: 5px">{{ selDay }}</span
          >的出力曲线
        </div>
        <div
          style="
            width: calc(100% - 5px);
            height: calc(50% - 30px);
            margin-left: 5px;
            border-radius: 5px;
            box-shadow: deepskyblue 0px 0px 15px inset;
          "
          v-loading="loading2"
        >
          <dayEChart ref="dayEChart" style="height: calc(100%)"></dayEChart>
        </div>
        <div style="height: calc(50% - 15px); padding: 0 0 5px 5px">
          <div class="con-text">
            <span style="color: orange; padding-right: 5px">{{
              selStationName
            }}</span
            >在
            <span style="color: orange; padding-right: 5px">{{ selDay }}</span
            >的出力数据
          </div>
          <el-table
            ref="table3"
            :data="listData"
            :height="tableHeight2"
            size="small"
            class="fileTable"
            v-loading="loading2"
          >
            <el-table-column prop="time" label="时间点"></el-table-column>
            <el-table-column prop="p_a" label="实际">
              <template slot-scope="scope">
                <span v-html="getNumHtml2(scope.row.p_a)"></span>
              </template>
            </el-table-column>
            <el-table-column label="短期预测(MW)">
              <template slot-scope="scope">
                <span v-html="getPowerHtml(scope.row.s)"></span>
              </template>
            </el-table-column>
            <el-table-column label="超短期预测(MW)">
              <template slot-scope="scope">
                <span v-html="getPowerHtml(scope.row.us)"></span>
              </template>
            </el-table-column>
            <el-table-column label="方天短期预测(MW)">
              <template slot-scope="scope">
                <span v-html="getPowerHtml(scope.row.fts)"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { StationBriefAll2, getMonthAssess, getStationDailyAssessInMonth, getStationDayPower } from '@/api/api'
import dayEChart from './components/dayEChart'
export default {
  name: 'index',
  components: {
    dayEChart
  },
  data() {
    return {
      orderData: {
        prop: 'c2',
        order: 'descending'
      },
      loading: false,
      loading2: false,
      value1: '',
      value2: '',
      value: '',
      tableShow: true,
      options: [
        { value: '', label: '全省' }
      ],
      selStationName: '',
      selMonth: '',
      selDay: '',
      tableData: [],
      tableData2: [],
      listData: []
    }
  },
  watch: {
    '$route.fullPath': {
      handler: function(newV, oldV) {
        const table1 = this.$refs['table1']
        const table2 = this.$refs['table2']
        const table3 = this.$refs['table3']
        if (table1) {
          table1.doLayout()
        }
        if (table2) {
          table2.doLayout()
        }
        if (table3) {
          table3.doLayout()
        }
      }
    }
  },
  created() {
    this.value2 = new Date()
    StationBriefAll2().then(res => {
      this.options = [{ value: '', label: '全省' }]
      res.data.forEach(item => {
        this.options.push({
          value: item.id,
          label: item.name
        })
      })
    })
    this.queryData()
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.height - 175
    },
    tableHeight2() {
      return this.$store.state.app.height / 2 - 114
    }
  },
  methods: {
    // 排序
    async changeSort(val) {
      if (val) {
        this.orderData.prop = val.prop
        this.orderData.order = val.order
      } else {
        this.orderData.prop = null
        this.orderData.order = null
      }
      this.queryData()
    },
    onSel() {
      if (this.value) {
        this.tableShow = false
      } else {
        this.tableShow = true
      }
    },
    setCurrentRow(row, event, column) {
      this.tableShow = false
      this.value = row.id
      this.queryData(event, row.id, row.date)
    },
    setCurrentRow2(row, event, column) {
      this.queryData2(event, row.id, row.date)
    },
    queryData(event, stationId, month) {
      let orderList
      if (this.orderData.order === 'descending') {
        orderList = {
          orderId: this.orderData.prop,
          orderType: 'desc'
        }
      } else if (this.orderData.order === 'ascending') {
        orderList = {
          orderId: this.orderData.prop,
          orderType: 'asc'
        }
      }
      this.loading = true
      if (month) {
        this.value2 = new Date(month)
      } else {
        if (this.value2) {
          month = formatDate(this.value2, 'yyyy-MM')
        }
      }
      if (stationId) {
        this.value = stationId
      } else {
        stationId = this.value
      }

      for (let i = this.options.length - 1; i >= 0; i--) {
        const option = this.options[i]
        if (option.value === stationId) {
          this.selStationName = option.label
          break
        }
      }

      if (this.value) {
        getStationDailyAssessInMonth(stationId, month).then(res => {
          this.selMonth = month
          this.tableData2 = []
          res.data.forEach(item => {
            this.tableData2.push({
              id: item.id,
              name: item.name,
              date: item.time,
              c1: item.c1,
              c2: item.c2,
              c3: item.c3,
              c4: item.c4,
              c5: item.c5
            })
          })

          this.listData = []
          this.selDay = ''
          if (this.$refs.dayEChart) {
            this.$refs.dayEChart.clearCurve()
          }
          this.loading = false
        }).catch(s_err => {
          this.loading = false
        })
      } else {
        getMonthAssess(month, orderList).then(res => {
          this.tableData = []
          res.data.forEach(item => {
            this.tableData.push({
              id: item.id,
              name: item.name,
              date: item.time,
              c1: item.c1,
              c2: item.c2,
              c3: item.c3,
              c4: item.c4
            })
          })
          this.loading = false
        }).catch(s_err => {
          this.loading = false
        })
      }
    },
    queryData2(event, stationId, day) {
      this.loading2 = true
      getStationDayPower(stationId, day).then(res => {
        this.selDay = day
        const timeList = res.data.timeList
        const aList = res.data.actual
        const sList = res.data.short
        const usList = res.data.ultraShort
        const shortFt = res.data.shortFt
        this.$refs.dayEChart.refreshCurve(timeList, aList, sList, usList, shortFt)
        this.listData = []
        timeList.forEach((time, index) => {
          const d = {
            time: time,
            p_a: aList[index],
            s: sList[index],
            us: usList[index],
            fts: shortFt[index]
          }
          this.listData.push(d)
        })
        this.loading2 = false
      }).catch(s_err => {
        this.loading2 = false
      })
    },
    getNumHtml(num) {
      if (num !== null) {
        if (num === 0) {
          return '<span class="ok-text">' + num + '</span>'
        } else {
          return '<span class="err-text">' + num + '</span>'
        }
      } else {
        return '-'
      }
    },
    getNumHtml2(num) {
      if (num !== null) {
        return num
      } else {
        return '-'
      }
    },
    getPowerHtml(val) {
      const p = val.p
      const q = val.q
      if (p != null) {
        if (q === true) {
          return '<span class="ok-text">' + p + '</span>'
        } else if (q === false) {
          return '<span class="err-text">' + p + '</span>'
        } else {
          return '<span class="gray-text">' + p + '</span>'
        }
      } else {
        return '-'
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .ok-text {
  color: #28ff28 !important;
}
/deep/ .err-text {
  color: red !important;
}
/deep/ .gray-text {
  color: #ccc !important;
}
.AssessmentStatistics {
  width: 100%;
  height: 100%;
  //background-image: url("../../../../assets/img/bg_body.jpg");
  background-image: url("../../../../assets/img/data08.png");
  .statisticsSel {
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding: 0 15px;
    margin: 0 10px;
    color: white;
    border-radius: 5px;
    background-position-y: 9%;
    background-image: url("../../../../assets/img/bg_box3.png");
    background-size: 100% 100%;
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
  }
  .statisticsCon {
    height: calc(100% - 70px);
    padding: 0 10px;
    display: flex;
    margin: 0;
    .con-table {
      height: 100%;
      width: 50%;
    }
  }
  .con-text {
    height: 35px;
    line-height: 35px;
    color: white;
    font-size: 17px;
    font-weight: bold;
    font-family: Source Han Sans CN, Source Han Sans CN-Regular;
    text-align: left;
  }
}
/deep/ .el-table--border::after,
.el-table--group::after {
  background-color: transparent;
}
/deep/ .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: deepskyblue;
  font-size: 16px;
  cursor: default;
}
/deep/ .row-table .el-table__body tr:hover > td {
  cursor: pointer;
}
/deep/ .el-table__body td {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
  text-align: center;
}
/deep/.el-table thead.is-group th {
  background: rgba(0, 0, 0, 0.1);
  border: 1px slategrey solid !important;
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
/deep/ .el-popper[x-placement^="bottom"] {
  margin-top: 12px;
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
  border: 1px solid slategrey;
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
