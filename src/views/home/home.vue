<template>
  <div class="home">
    <div class="content">
<!--      <el-card class="con">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span style="font-size: 22px;font-weight: 800">当天短期上报情况</span>-->
<!--        </div>-->
<!--        <div style="width: 100%;height: 100%;display: flex">-->
<!--          <Charts1 style="width: 50%" :shortTime="shortTime"></Charts1>-->
<!--          <div style="width: 50%;padding-left: 5px">-->
<!--            <span style="font-size: 18px;">漏报子站列表</span>-->
<!--            <el-table :data="tableData" border size="small" height="80%" style="width: 100%;overflow: auto">-->
<!--              <el-table-column prop="stationName" label="子站名"></el-table-column>-->
<!--              <el-table-column :formatter="getCauseDesc" label="漏报原因"></el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <el-card class="con">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span style="font-size: 22px;font-weight: 800">当前时刻（{{timeDate}}）超短期上报情况</span>-->
<!--        </div>-->
<!--        <div style="width: 100%;height: 100%;display: flex">-->
<!--          <Charts2 style="width: 50%" :ultraShortTime="ultraShortTime"></Charts2>-->
<!--          <div style="width: 50%;">-->
<!--            <span style="font-size: 18px;">漏报子站列表</span>-->
<!--            <el-table :data="ultraTableData" border height="80%" size="small" style="width: 100%">-->
<!--              <el-table-column prop="stationName" label="子站名"></el-table-column>-->
<!--              <el-table-column :formatter="getCauseDesc" label="漏报原因"></el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <el-card class="con">-->
<!--        <Charts3 :LastMonthData="LastMonthData"></Charts3>-->
<!--      </el-card>-->
<!--      <el-card class="con">-->
<!--        <Charts5 :UltraShortData="UltraShortData"></Charts5>-->
<!--      </el-card>-->
<!--      <el-card class="conCharts">-->
<!--        <Charts4></Charts4>-->
<!--      </el-card>-->
    </div>
  </div>
</template>

<script>
import Charts1 from './components/Charts1'
import Charts2 from './components/Charts2'
import Charts3 from './components/Charts3'
import Charts4 from './components/Charts4'
import Charts5 from './components/Charts5'
import { descriptions } from 'element-ui'
import { ShortTermReporting, UltraShortTermReporting, LastMonthRankTop10, UltraShortTermTop10 } from '../../api/api'
import { getTimeDate } from '../../utils/timeDate'
import moment from 'moment'
export default {
  name: 'home',
  data() {
    return {
      tableData: [],
      ultraTableData: [],
      LastMonthData: [],
      UltraShortData: [],
      date: '',
      time: '',
      timeDate: '',
      shortTime: {},
      ultraShortTime: {}
    }
  },
  components: {
    Charts1,
    Charts2,
    Charts3,
    Charts4,
    Charts5,
    descriptions
  },
  mounted() {
    this.timeDate = getTimeDate()
    this.getShortTermReporting()
    this.getUltraShortTermReporting()
    this.getLastMonthRankTop10()
    this.getUltraShortTermTop10()
    setInterval(() => {
      getTimeDate()
      this.getUltraShortTermReporting()
    }, 60000)
  },
  methods: {
    // 当天短期上报情况
    getShortTermReporting() {
      this.date = moment().format('YYYY-MM-DD')
      ShortTermReporting(this.date).then((res) => {
        if (res.code === 0) {
          this.shortTime = JSON.parse((JSON.stringify(res.data)))
          this.tableData = this.shortTime.failToDeclareSubsiteList
        }
      })
    },
    // 当前时刻超短期上报情况
    getUltraShortTermReporting() {
      const getDate = moment().format('YYYY-MM-DD ' + this.timeDate)
      UltraShortTermReporting(getDate).then((res) => {
        if (res.code === 0) {
          this.ultraShortTime = JSON.parse((JSON.stringify(res.data)))
          this.ultraTableData = this.ultraShortTime.failToDeclareSubsiteList
        }
      })
    },
    // 短期准确率TOP10
    getLastMonthRankTop10() {
      const month = moment(new Date()).subtract(1, 'months').format('YYYY-MM')
      LastMonthRankTop10(month).then((res) => {
        if (res.code === 0) {
          this.LastMonthData = res.data
        }
      })
    },
    // 超短期准确率TOP10
    getUltraShortTermTop10() {
      const month = moment(new Date()).subtract(1, 'months').format('YYYY-MM')
      UltraShortTermTop10(month).then((res) => {
        if (res.code === 0) {
          this.UltraShortData = res.data
        }
      })
    },
    getCauseDesc(row) {
      const missCause = row.missCause
      if (missCause === 2) {
        return '迟报'
      } else if (missCause === 3) {
        return '错报'
      } else if (missCause === 4) {
        return '缺失时间点'
      } else {
        return '未知'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  display: block;
  background-color: white;
  //overflow-y: scroll;
  .title{
    display: flex;
    justify-content: space-between;
    height: 10%;
    .title-text{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 28px;
      color: orange;
    }
  }
  .content{
    height: 90%;
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    flex-wrap: wrap;
    .con{
      width: 47%;
      height: 45%;
      margin: 10px;
      text-align: left;
    }
    /deep/ .el-card__header {
      padding: 0px 20px;
      border-bottom: 1px solid #EBEEF5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
    }
    /deep/ .el-card__body {
      padding: 20px;
      height: calc(100% - 58px);
    }
    .conCharts{
      width: 96%;
      height: 450px;
      margin: 10px;
      background-color: #ffffff;
    }
  }
}
</style>
