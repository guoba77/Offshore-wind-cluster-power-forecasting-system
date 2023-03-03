<template>
  <div class="subSationECharts">
    <div class="ECharts">
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">短期功率预测上报率</span>
          <el-date-picker
              style="float: right;top:8px;"
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
          </el-date-picker>
        </div>
        <ShortTermPowerChart></ShortTermPowerChart>
      </el-card>
    </div>
    <div class="ECharts">
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">次日短期功率预测每日合格率</span>
          <el-date-picker
              style="float: right;top:8px;"
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
          </el-date-picker>
        </div>
        <NextDayShortTermChart></NextDayShortTermChart>
      </el-card>
    </div>
    <div class="ECharts">
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">月度次日短期功率预测点数合格率</span>
          <el-date-picker
              style="float: right;top:8px;"
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
          </el-date-picker>
        </div>
        <MonthlyShortTermChart></MonthlyShortTermChart>
      </el-card>
    </div>
    <div class="ECharts">
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">超短期功率预测上报率</span>
          <el-date-picker
              style="float: right;top:8px;"
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
          </el-date-picker>
        </div>
        <UltraShortTermPowerChart></UltraShortTermPowerChart>
      </el-card>
    </div>
    <div class="ECharts">
      <el-card class="box-card" style="width: 100%;height: 100%">
        <div slot="header" class="clearfix">
          <span style="float: left">月度超短期功率预测点数合格率</span>
          <el-date-picker
              style="float: right;top:8px;"
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small">
          </el-date-picker>
        </div>
        <MonthlyUltraShortTermPowerChart></MonthlyUltraShortTermPowerChart>
      </el-card>
    </div>
  </div>
</template>

<script>
import ShortTermPowerChart from './ShortTermPowerChart'
import NextDayShortTermChart from './NextDayShortTermChart'
import MonthlyShortTermChart from './MonthlyShortTermChart'
import UltraShortTermPowerChart from './UltraShortTermPowerChart'
import MonthlyUltraShortTermPowerChart from './MonthlyUltraShortTermPowerChart'
export default {
  name: 'SubSationECharts',
  data() {
    return {
      value: ''
    }
  },
  components: {
    ShortTermPowerChart,
    NextDayShortTermChart,
    MonthlyShortTermChart,
    UltraShortTermPowerChart,
    MonthlyUltraShortTermPowerChart
  }
}
</script>

<style lang="scss" scoped>
.subSationECharts{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .ECharts{
    width: 97%;
    height: 400px;
    margin: 10px;
    background-color: red;
  }
}
</style>
