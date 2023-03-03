<template>
  <div class="subSation">
    <div class="subTitle">
      <div style="color: black;font-size: 18px;font-weight: 800">{{ text }} 场站</div>
      <div style="font-size: 16px;">装机容量：<span style="color: orange">1000(万千瓦)</span>
        <span style="padding-left: 15px">上月预测准确率排名：<span style="color: orange">1</span></span>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float: left;color: black;padding-right: 10px;font-size: 20px;font-weight: 800">日度概览</span>
        <el-date-picker
            v-model="date"
            style="float: left;"
            @change="onDay"
            type="date"
            size="small"
            :picker-options="pickerOptions"
            placeholder="选择日期（默认当天）">
        </el-date-picker>
      </div>
      <div class="card-tian">
        <el-card shadow="always" class="tian-Title">
          <div class="tian-text">短期功率预测</div>
          <el-tag class="tian-tag">已上报时间点数：<span class="tian-text-con">{{timeValue}}</span></el-tag>
        </el-card>
        <el-card shadow="always" class="tian-Title">
          <div class="tian-text">超短期功率预测</div>
          <div style="display: flex;flex-wrap: wrap;margin: 5px;height: 90px">
            <el-tag class="tian-tag">当前时刻({{TimeDate}})上报数：<span class="tian-text-con">{{daySuperShortTermList.forcastTimeCount}}</span></el-tag>
            <el-tag class="tian-tag">漏报次数：<span class="tian-text-con">{{daySuperShortTermList.omissionCount}}</span></el-tag>
            <el-tag class="tian-tag">日上报率：<span class="tian-text-con">{{daySuperShortTermList.reportRate}}%</span></el-tag>
            <el-tag class="tian-tag">第十五分钟合格率：<span class="tian-text-con">{{daySuperShortTermList.qualifyRate}}%</span></el-tag>
          </div>
        </el-card>
      </div>
      <div style="display: flex;padding-bottom: 30px">
        <div class="card-table">
          <div class="tian-text">次日短期上报详情</div>
          <el-table ref="table1" :data="tableData" border height="100%" :row-class-name="tableRowClassName" size="mini">
            <el-table-column prop="serialNum" label="序号"></el-table-column>
            <el-table-column prop="isUpload" label="是否上传">
              <template slot-scope="scope">
                <span v-if="scope.row.isUpload === true" class="table-text">是</span>
                <span v-else-if="scope.row.isUpload === false">否</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="预测时间">
              <template slot-scope="scope">
                <span v-if="scope.row.time !== null" class="table-text">{{scope.row.time}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="forcastValue" label="预测功率(万千瓦)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.forcastValue !== null" class="table-text">{{scope.row.forcastValue}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="power" label="实际功率(万千瓦)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.power !== null" class="table-text">{{scope.row.power}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="accuracy" label="准确率(%)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.accuracy !== null" class="table-text">{{scope.row.accuracy}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="isQualify" label="是否合格">
              <template slot-scope="scope,text">
                <span v-if="scope.row.isQualify === true" class="table-text">是</span>
                <span v-else-if="scope.row.isQualify === false">否</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="card-table">
          <div class="tian-text">第十五分钟超短期上报详情</div>
          <el-table 
              ref="table2"
              :data="nextTableData"
              border
              height="100%"
              :row-class-name="tableRowClassName"
              size="mini">
            <el-table-column prop="serialNum" label="序号"></el-table-column>
            <el-table-column prop="isUpload" label="是否上传">
              <template slot-scope="scope">
                <span v-if="scope.row.isUpload === true" class="table-text">是</span>
                <span v-else-if="scope.row.isUpload === false">否</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="预测时间">
              <template slot-scope="scope">
                <span v-if="scope.row.time !== null" class="table-text">{{scope.row.time}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="forcastValue" label="预测功率(万千瓦)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.forcastValue !== null" class="table-text">{{scope.row.forcastValue}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="power" label="实际功率(万千瓦)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.power !== null" class="table-text">{{scope.row.power}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="accuracy" label="准确率(%)">
              <template slot-scope="scope,text">
                <span v-if="scope.row.accuracy !== null" class="table-text">{{scope.row.accuracy}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="isQualify" label="是否合格">
              <template slot-scope="scope,text">
                <span v-if="scope.row.isQualify === true" class="table-text">是</span>
                <span v-else-if="scope.row.isQualify === false">否</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float: left;color: black;padding-right: 10px;font-size: 20px;font-weight: 800">月度概览</span>
        <el-date-picker
            v-model="monthDate"
            style="float: left;"
            type="month"
            size="small"
            @change="onMonth"
            :picker-options="pickerOptions"
            placeholder="选择月份（默认当月）">
        </el-date-picker>
      </div>
      <div class="card-tian">
        <el-card shadow="always" class="tian-Title-2">
          <div class="tian-text">短期功率预测</div>
          <div style="display: flex;height: 120px;flex-wrap: wrap">
            <el-tag class="tian-tag">上报率：<span class="tian-text-con">{{monthShortTermList.reportRate}}%</span></el-tag>
            <el-tag class="tian-tag">漏报次数：<span class="tian-text-con">{{monthShortTermList.omissionCount}}</span></el-tag>
            <el-tag class="tian-tag">次日合格率：<span class="tian-text-con">{{monthShortTermList.qualifyRate}}%</span></el-tag>
            <el-tag class="tian-tag">次日不合格点数：<span class="tian-text-con">{{monthShortTermList.unQualifyCount}}</span></el-tag>
            <el-tag class="tian-tag">次日超总点数2%不合格点数：<span class="tian-text-con">{{monthShortTermList.overMaxUnQualify}}</span></el-tag>
          </div>
        </el-card>
        <el-card shadow="always" class="tian-Title-2">
          <div class="tian-text">超短期功率预测</div>
          <div style="display: flex;flex-wrap: wrap;height: 90px">
            <el-tag class="tian-tag">上报率：<span class="tian-text-con">{{monthSuperShortTermList.reportRate}}%</span></el-tag>
            <el-tag class="tian-tag">漏报次数：<span class="tian-text-con">{{monthSuperShortTermList.omissionCount}}</span></el-tag>
            <el-tag class="tian-tag">第十五分钟合格率：<span class="tian-text-con">{{monthSuperShortTermList.qualifyRate}}%</span></el-tag>
            <el-tag class="tian-tag">第十五分钟不合格点数：<span class="tian-text-con">{{monthSuperShortTermList.unQualifyCount}}</span></el-tag>
          </div>
        </el-card>
      </div>
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">短期次日功率预测每日合格率</span>
        </div>
        <NextDayShortTermChart v-if="show" :num="num" :month="monthDate" :dataList="dtOList"></NextDayShortTermChart>
      </el-card>
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">超短期功率预测每日上报率</span>
        </div>
        <UltraShortTermPowerChart v-if="show1" :num="num" :month="monthDate" :dataList="dayList"></UltraShortTermPowerChart>
      </el-card>
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">超短期第15分钟功率预测每日合格率</span>
        </div>
        <MonthlyShortTermChart v-if="show2" :num="num" :month="monthDate" :dataList="fifteenList"></MonthlyShortTermChart>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import NextDayShortTermChart from './components/NextDayShortTermChart'
import UltraShortTermPowerChart from './components/UltraShortTermPowerChart'
import MonthlyShortTermChart from './components/MonthlyShortTermChart'
import { CountStationDayUpload, StationQuarterView, QueryForcastList, NextQueryForcastList, DayData,
  MonthReportUploadShort, MonthReport, IsNoQualifyResDTOList, DayUploadRateInMonth, DayQualifyRateInMonth } from '../../api/api'
import moment from 'moment'
import { getTimeDate } from '../../utils/timeDate'
// 生成24小时内15分钟的方法
function Data() {
  var tmp1 = ''
  var tmp2 = ''
  var tmp3 = ''
  var tmp4 = ''
  var list = []
  // 24
  for (var i = 0; i < 24; i++) {
    if (i <= 9) {
      tmp1 = '0' + i + ':00'
      tmp2 = '0' + i + ':15'
      tmp3 = '0' + i + ':30'
      tmp4 = '0' + i + ':45'
    } else {
      tmp1 = i + ':00'
      tmp2 = i + ':15'
      tmp3 = i + ':30'
      tmp4 = i + ':45'
    }
    list.push(tmp1)
    list.push(tmp2)
    list.push(tmp3)
    list.push(tmp4)
  }
  return list
}
export default {
  name: 'index',
  data() {
    return {
      timeValue: '',
      monthDate: '',
      TimeDate: '',
      monthShortTermList: {
        notQualify: '',
        omissionCount: '',
        qualifyRate: '',
        reportRate: '',
        unQualifyCount: ''
      },
      monthSuperShortTermList: {
        unQualifyCount: '',
        omissionCount: '',
        qualifyRate: '',
        reportRate: ''
      },
      daySuperShortTermList: {
        notQualify: '',
        omissionCount: '',
        qualifyRate: '',
        reportRate: ''
      },
      xList: [],
      yData1: [],
      yData2: [],
      yData3: [],
      tableData: [],
      nextTableData: [],
      date: '',
      text: '',
      activeName: 'first',
      subList: {},
      stationId: '',
      stationName: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      dtOList: [],
      fifteenList: [],
      dayList: [],
      num: 1,
      show: false,
      show1: false,
      show2: false
    }
  },
  components: {
    NextDayShortTermChart,
    UltraShortTermPowerChart,
    MonthlyShortTermChart
  },
  computed: {
    monitor() {
      return this.$store.state.tree.treeLabel
    },
    monitor1() {
      return this.$store.state.tree.subSationList
    }
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
    monitor() {
      return (this.text = this.$store.state.tree.treeLabel)
    },
    monitor1() {
      return (this.showList(this.$store.state.tree.subSationList))
    }
  },
  mounted() {
    this.date = moment().format('YYYY-MM-DD')
    this.monthDate = moment().format('YYYY-MM')
    this.monthValue = moment().format('YYYY-MM-DD')
    this.TimeDate = getTimeDate()
    this.stationId = Number(localStorage.getItem('stationId'))
    if (this.text === '') {
      this.text = localStorage.getItem('label')
    }
    this.xList = Data()
    // this.drawLine()
    // 日度
    this.getCountStationDayUpload()
    this.getStationQuarterView()
    this.getQueryForcastList()
    this.getNextQueryForcastList()
    this.getDayData()
    // 月度
    this.getMonthReportUploadShort()
    this.getMonthReport()
    this.getIsNoQualifyResDTOList()
    this.getDayUploadRateInMonth()
    this.getDayQualifyRateInMonth()
  },
  methods: {
    // 日度概览----------------------------------------------------------------------------------------
    // 获取当前日期
    onDay(e) {
      this.date = moment(e).format('YYYY-MM-DD')
      this.getCountStationDayUpload()
      this.getStationQuarterView()
      this.getQueryForcastList()
      this.getNextQueryForcastList()
      this.getDayData()
    },
    // 子站日度短期功率预测
    getCountStationDayUpload() {
      CountStationDayUpload({
        date: this.date,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.timeValue = res.data
        }
      })
    },
    // 子站日度短期功率预测
    getStationQuarterView() {
      StationQuarterView({
        date: this.date + ' ' + getTimeDate(),
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.daySuperShortTermList = res.data
        }
      })
    },
    // 子站次日短期上报详情
    getQueryForcastList() {
      QueryForcastList({
        time: this.date,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.tableData = JSON.parse(JSON.stringify(res.data))
          if (this.tableData.length > 0) {
            this.tableData.forEach((item, index) => {
              item.serialNum = index + 1
            })
          }
        }
      })
    },
    // 子站第十五分钟超短期上报详情
    getNextQueryForcastList() {
      NextQueryForcastList({
        time: this.date + ' ' + getTimeDate(),
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.nextTableData = JSON.parse(JSON.stringify(res.data))
          if (this.tableData.length > 0) {
            this.nextTableData.forEach((item, index) => {
              item.serialNum = index + 1
            })
          }
        }
      })
    },
    // 实际数据与预测数据对比图
    getDayData() {
      this.yData1 = []
      this.yData2 = []
      this.yData3 = []
      DayData({
        time: this.date,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          // realPowerList实际功率
          // forcastNextDayShortList 短期
          // forcastNextQuarterUltraShortList 超短期
          res.data.realPowerList.forEach((item) => {
            this.yData1.push(item.power)
          })
          res.data.forcastNextDayShortList.forEach((item) => {
            const obj = {}
            if (item.isQualify === true) {
              obj.value = item.power
              obj.itemStyle = { normal: { color: 'green' }}
            } else if (item.isQualify === false) {
              obj.value = item.power
              obj.itemStyle = { normal: { color: 'red' }}
            } else {
              obj.value = item.power
              obj.itemStyle = { normal: { color: '#999' }}
            }
            this.yData2.push(obj)
          })
          res.data.forcastNextQuarterUltraShortList.forEach((item) => {
            const obj = {}
            if (item.isQualify === true) {
              obj.value = item.power
              obj.itemStyle = { normal: { color: 'green' }}
            } else if (item.isQualify === false) {
              obj.value = item.power
              obj.itemStyle = { normal: { color: 'red' }}
            } else {
              obj.value = item.power
              obj.itemStyle = { normal: { color: '#999' }}
            }
            this.yData3.push(obj)
          })
          this.drawLine()
        }
      })
    },
    // 月度概览----------------------------------------------------------------------------------------
    // 获取当前月
    onMonth(e) {
      this.monthDate = moment(e).format('YYYY-MM')
      this.num += 1
      this.show = true
      this.show2 = true
      this.getMonthReportUploadShort()
      this.getMonthReport()
      this.getIsNoQualifyResDTOList(this.monthDate)
      this.getDayUploadRateInMonth(this.monthDate)
      this.getDayQualifyRateInMonth(this.monthDate)
    },
    // 子站月度短期功率预测
    getMonthReportUploadShort() {
      MonthReportUploadShort({
        date: this.monthDate,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.monthShortTermList = res.data
        }
      })
    },
    // 子站月度超短期功率预测
    getMonthReport() {
      MonthReport({
        date: this.monthDate,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.monthSuperShortTermList = res.data
        }
      })
    },
    // 子站月度短期次日功率预测每日合格率
    getIsNoQualifyResDTOList(monthDate) {
      IsNoQualifyResDTOList({
        time: this.monthDate,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.show = true
          this.num += 1
          this.dtOList = res.data
        }
      })
    },
    // 子站月度超短期功率预测每日上报率
    getDayUploadRateInMonth() {
      DayUploadRateInMonth({
        time: this.monthDate,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.show1 = true
          this.num += 1
          this.dayList = res.data
        }
      })
    },
    // 子站月度超短期第15分钟功率预测每日合格率
    getDayQualifyRateInMonth() {
      DayQualifyRateInMonth({
        time: this.monthDate,
        stationId: this.stationId
      }).then((res) => {
        if (res.code === 0) {
          this.show2 = true
          this.num += 1
          this.fifteenList = res.data
        }
      })
    },
    // 其他接口----------------------------------------------------------------------------------------
    showList(subSationList) {
      this.subList = subSationList
      this.stationId = localStorage.getItem('stationId')
      this.stationName = localStorage.getItem('stationName')
      // 日度
      this.getCountStationDayUpload()
      this.getStationQuarterView()
      this.getQueryForcastList()
      this.getNextQueryForcastList()
      this.getDayData()
      // 月度
      this.getMonthReportUploadShort()
      this.getMonthReport()
      this.getIsNoQualifyResDTOList()
      this.getDayUploadRateInMonth()
      this.getDayQualifyRateInMonth()
    },
    handleClick(tab, event) {
      this.drawLine()
      this.$store.commit('SET_CHARS', true)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isQualify === false) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(_ => {
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        const option = {
          color: ['#ec5c06', '#3095FB', '#31BA91'],
          series: [
            {
              type: 'line',
              name: '实际功率',
              symbolSize: 20,
              symbol: 'triangle',
              data: this.yData1
            },
            {
              type: 'line',
              symbolSize: 20,
              symbol: 'square',
              name: '短期预测功率',
              data: this.yData2
            },
            {
              type: 'line',
              symbolSize: 20,
              symbol: 'circle',
              itemStyle: { normal: { color: '#999' }},
              name: '超短期预测功率',
              data: this.yData3
            }
          ],
          legend: {
            left: 200,
            //  bottom: '4%',
            top: 10,
            textStyle: {
              color: '#000',
              fontSize: '13'
            },
            itemGap: 20,
            itemWidth: 10,
            itemHeight: 10,
            icon: 'circle',
            data: ['实际功率', '短期预测功率', '超短期预测功率']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999999',
                type: 'dashed'
              }
            },
            data: this.xList
          },
          yAxis: {
            nameTextStyle: {
              fontSize: 16
            },
            axisLabel: {
              show: true,
              margin: 10,
              formatter: '{value}'
            },
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999999'
              }
            }
          },
          // 'dataZoom': [{
          //   'show': true,
          //   'height': 12,
          //   'xAxisIndex': [
          //     0
          //   ],
          //   bottom: '8%',
          //   'start': 10,
          //   'end': 90,
          //   handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          //   handleSize: '110%',
          //   handleStyle: {
          //     color: '#d3dee5'
          //
          //   },
          //   textStyle: { color: '#fff' },
          //   borderColor: '#90979c'
          // }, {
          //   'type': 'inside',
          //   'show': true,
          //   'height': 15,
          //   'start': 1,
          //   'end': 35
          // }],
          title: {
            text: '实际与预测数据对比图',
            textStyle: {
              align: 'left',
              color: '#2a476d',
              fontSize: 17,
              fontFamily: 'Source Han Sans CN, Source Han Sans CN-Regular'
            },
            // left: 'left',
            top: 10,
            left: 5
          },
          grid: {
            top: 60,
            left: 50,
            right: 50,
            bottom: '10%' // 也可设置left和right设置距离来控制图表的大小
          }
        }
        myChart.setOption(option)
        myChart.resize()
        window.addEventListener('resize', function() {
          myChart.resize()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.subSation{
  width: calc(100% - 20px);
  //height: calc(100% - 20px);
  padding: 10px;
  background-color: white;
  .subTitle{
    border: 2px solid #999;
    height: 60px;
    text-align: left;
    padding-left: 10px;
    padding-top: 5px;
    display: grid;
    //line-height: 60px;
  }
  .card-tian{
    display: flex;
    //justify-content: space-around;
    .tian-Title{
      width: 50%;
      height: 130px;
      text-align: center;
      padding: 10px;
    }
    .tian-Title-2 {
      width: 50%;
      height: 160px;
      text-align: center;
      padding: 10px;
    }
    .tian-text{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-weight: 800;
      text-align: left;
    }
    .tian-tag{
      font-size: 18px;
      width: 50%;
      text-align: left;
      float: left;
    }
    .tian-text-con{
      color: orange;
    }
  }
  .card-table{
    width: 50%;
    height: 400px;
    text-align: left;
    padding: 10px;
    .tian-text{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-weight: 800;
    }
  }
  // 卡片组件
  /deep/ .el-card__header {
    padding: 0px 20px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
  }
  /deep/ .el-card__body {
    //padding: 20px;
    height: calc(100% - 58px);
  }
  /deep/ .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
  /deep/ .el-card__body {
    padding: 5px;
  }
  // 表格组件
  /deep/ .el-table--border .cell {
    padding-left: 10px;
    text-align: center;
  }
  /deep/ .el-table .warning-row {
    color: #f5364a;
    background-color: #fde0e3;
    border-color: #fde0e3;
    font-size: 18px;
  }
  /deep/ .el-table .success-row {
    color: #fff;
    background-color: #1BC5BD;
    border-color: #1BC5BD;
    font-size: 18px;
  }
  /deep/
  .el-table__body tr:hover>td {
    background-color: #999 !important;
    color: black;
  }
}
</style>
