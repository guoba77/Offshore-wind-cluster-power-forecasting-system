<template>
  <div class="power" v-loading="loading" element-loading-text="Loading...">
    <div class="powerText">
      <div class="powerText-border">
        <dv-border-box-10>
          <div class="text">{{ mainQuota.totalCapacity }} MW</div>
          <div class="title">总装机容量</div>
        </dv-border-box-10>
      </div>
      <div class="powerText-border">
        <dv-border-box-10>
          <div class="text">{{ mainQuota.stationCount }} 座</div>
          <div class="title">电站数量</div>
        </dv-border-box-10>
      </div>
      <div class="powerText-border">
        <dv-border-box-10>
          <div @click="viewShortMiss" class="text">
            {{ mainQuota.currentShortUploaded }} 座
          </div>
          <div @click="viewShortMiss" class="title">短期实时上报</div>
        </dv-border-box-10>
      </div>
      <div class="powerText-border">
        <dv-border-box-10>
          <div @click="viewUltraShortMiss" class="text">
            {{ mainQuota.currentUltraShortUploaded }} 座
          </div>
          <div @click="viewUltraShortMiss" class="title">
            超短期实时上报({{ mainQuota.quarterShow }})
          </div>
        </dv-border-box-10>
      </div>
    </div>
    <div class="powerEChart">
      <div class="powerSel">
        <div style="width: 40%; text-align: left">
          <span>日期范围：</span>
          <el-date-picker
            v-model="dateRange"
            size="small"
            type="daterange"
            range-separator="至"
            style="
              width: 300px;
              background-color: rgba(0, 0, 0, 0);
              box-shadow: deepskyblue 0px 0px 10px inset;
              border: 0px solid deepskyblue;
            "
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div style="width: 60%; text-align: left; display: flex">
          <span>数据维度：</span>
          <el-select
            v-model="dimension"
            size="small"
            filterable
            style="padding-right: 10px; width: 150px"
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-if="dsShow">地市：</span>
          <el-select
            v-model="city"
            size="small"
            v-if="dsShow"
            filterable
            style="padding-right: 10px; width: 180px"
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-if="qyShow">区域：</span>
          <el-select
            v-model="area"
            size="small"
            v-if="qyShow"
            filterable
            style="padding-right: 10px; width: 180px"
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in areaList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-if="fqShow">分群：</span>
          <el-select
            v-model="cluster"
            size="small"
            v-if="fqShow"
            filterable
            style="padding-right: 10px; width: 180px"
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in clusterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-if="czShow">场站：</span>
          <el-select
            v-model="stationId"
            size="small"
            v-if="czShow"
            filterable
            style="padding-right: 10px; width: 180px"
            placeholder="请选择或输入"
          >
            <el-option
              v-for="item in stationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-badge :value="newFocusMissCount" class="item" style="margin-left: auto;height: 20px;margin-right: 45px;">
            <el-link
              icon="el-icon-star-on"
              type="warning"
              style="height: 20px;width: 80px;"
              @click="viewFocusMiss">重点关注</el-link>
          </el-badge>
        </div>
      </div>
      <div class="powerSel">
        <div style="width: 40%; display: flex">
          <div style="display: flex; align-items: center">
            <span>气象数据：</span>
            <el-radio-group v-model="showWind">
              <el-radio style="color: white" :label="1">显示</el-radio>
              <el-radio style="color: white" :label="0">不显示</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div style="width: 60%; text-align: left; display: flex">
          <div style="width: 100%; display: flex; align-items: center">
            <span>气象来源：</span>
            <el-checkbox-group v-model="selWindList">
              <el-checkbox
                v-for="item in windOrig"
                :key="item.value"
                :label="item.value"
                :disabled="item.disabled"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="最新时间：08:00"
                  placement="bottom"
                  ><span>{{ item.label }}</span></el-tooltip
                >
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- <span>短期偏移：</span>
          <el-select v-model="shortOffset" size="small" filterable style="padding-right: 10px;width: 150px;"  placeholder="请选择或输入">
            <el-option v-for="item in dayList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span>超短期偏移：</span>
          <el-select v-model="ultraShortOffset" size="small" filterable style="padding-right: 10px;width: 150px;"  placeholder="请选择或输入">
            <el-option v-for="item in subList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
      </div>
      <div class="powerSel">
        <div style="width: 40%; display: flex; align-items: center">
          <span>预测类型：</span>
          <el-checkbox-group v-model="selForcastTypeList">
            <el-checkbox label="1">短期</el-checkbox>
            <el-checkbox label="2">超短期</el-checkbox>
          </el-checkbox-group>
        </div>
        <div
          style="
            width: 60%;
            text-align: left;
            display: flex;
            justify-content: space-between;
          "
        >
          <div style="display: flex">
            <span>出力来源：</span>
            <el-checkbox-group v-model="selPowerList">
              <el-checkbox
                v-for="item in powerOrig"
                :key="item.value"
                :label="item.value"
                :disabled="item.disabled"
                >
                 <el-tooltip
                 :disabled="item.value==='5'?false:true"
                  class="item"
                  effect="dark"
                  placement="bottom"
                  >
                  <div @click="showTable" class="Ftext" slot="content">
                    <el-link type="primary">{{`已对${PredictedCount}个场站作出预测`}}</el-link>
                    </div>
                  <span>{{ item.label }}</span>
                  </el-tooltip
                >
                </el-checkbox
              >
            </el-checkbox-group>
          </div>
          <div>
            <el-button
              style="
                background-color: rgba(0, 0, 0, 0);
                width: 80px;
                font-size: 16px;
                box-shadow: deepskyblue 0px 0px 15px inset;
                border: 0px solid deepskyblue;
              "
              type="primary"
              size="mini"
              plain
              @click="queryData"
              >查询</el-button
            >
            <el-button
              style="
                display: none;
                background-color: rgba(0, 0, 0, 0);
                width: 80px;
                font-size: 16px;
                box-shadow: deepskyblue 0px 0px 15px inset;
                border: 0px solid deepskyblue;
              "
              type="primary"
              size="mini"
              plain
              >导出</el-button
            >
          </div>
          <div></div>
        </div>
      </div>
      <windEChart ref="windEChart" :style="{ height: chartHeight, width: chartWidth }"></windEChart>
    </div>
    <dataShow
      :title="'短期上报异常详情'"
      :dataList="shortMissList"
      :visible="showShortMiss"
      v-on:handClose="showShortMiss = false"
    ></dataShow>
    <dataShow
      :title="'超短期上报异常详情'"
      :dataList="ultraShortMissList"
      :visible="showUltraShortMiss"
      v-on:handClose="showUltraShortMiss = false"
    ></dataShow>
    <focusDataShow
      :title="'重点关注场站上报异常详情'"
      :dataList="focusMissList"
      :visible="showFocusMiss"
      v-on:handClose="showFocusMiss = false"
    ></focusDataShow>
    <FtTable :ftvisible.sync="ftvisible" :ftdataList="ftdataList"></FtTable>
  </div>
</template>

<script>
import { getFtPredictedList, MainQuota, CurveData, CityList2, ClusterList, StationBriefAll, ClusterStationBrief, DayShortMiss, DayUltraShortMiss, DayFocusMiss } from '@/api/api'
import windEChart from '../WindSpeed/components/windEChart'
import dataShow from './components/dataShow'
import focusDataShow from './components/focusDataShow'
import FtTable from './components/FtTable'
import { formatDate } from '@/utils/date'

export default {
  name: 'index',
  components: {
    windEChart,
    dataShow,
    focusDataShow,
    FtTable
  },
  data() {
    return {
      ftdataList: [
      ],
      PredictedCount: null,
      ftvisible: false,
      loading: false,
      mainQuota: {
        day: null,
        quarter: null,
        quarterShow: null,
        totalCapacity: 0,
        stationCount: 0,
        currentShortUploaded: 0,
        currentUltraShortUploaded: 0
      },
      shortMissList: [],
      ultraShortMissList: [],
      focusMissList: [],
      height: '200px',
      showShortMiss: false,
      showUltraShortMiss: false,
      showFocusMiss: false,
      oldFocusMissCount: 0,
      newFocusMissCount: null,
      dateRange: '',
      dimension: '1',
      city: null,
      area: null,
      cluster: null,
      stationId: null,
      selWindList: [],
      selPowerList: ['2', '5'],
      shortOffset: '1',
      ultraShortOffset: '1',
      showWind: 1,
      selForcastTypeList: ['1', '2'],
      dsShow: false,
      qyShow: false,
      fqShow: false,
      czShow: false,
      cityList: [],
      clusterList: [],
      stationList: [],
      areaList: [
        { value: '1', label: '海上风电' },
        { value: '2', label: '沿海风电' },
        { value: '3', label: '陆地风电' }
      ],
      options: [
        { value: '1', label: '全省' },
        { value: '2', label: '地市' },
        { value: '3', label: '区域' },
        { value: '4', label: '分群' },
        { value: '5', label: '场站' }
      ],
      dayList: [
        { value: '1', label: '第1天' },
        { value: '2', label: '第2天' },
        { value: '3', label: '第3天' }
      ],
      subList: [
        { value: '1', label: '第1点' },
        { value: '2', label: '第2点' },
        { value: '3', label: '第3点' },
        { value: '4', label: '第4点' },
        { value: '5', label: '第5点' },
        { value: '6', label: '第6点' },
        { value: '7', label: '第7点' },
        { value: '8', label: '第8点' },
        { value: '9', label: '第9点' },
        { value: '10', label: '第10点' },
        { value: '11', label: '第11点' },
        { value: '12', label: '第12点' },
        { value: '13', label: '第13点' },
        { value: '14', label: '第14点' },
        { value: '15', label: '第15点' },
        { value: '16', label: '第16点' }
      ],
      windOrig: [
        { value: '1', label: '北院预测', disabled: false },
        { value: '2', label: '南院预测', disabled: false },
        // { value: '3', label: '南瑞气象局预测', disabled: true },
        { value: '4', label: '潮汐预测', disabled: false }
      ],
      powerOrig: [
        // { value: '1', label: '主站预测', disabled: true },
        { value: '2', label: '场站上报', disabled: false },
        { value: '3', label: '南院预测', disabled: true },
        { value: '4', label: '北院预测', disabled: true },
        { value: '5', label: '方天预测', disabled: false }
      ],
      timer: null
    }
  },
  watch: {
    dimension(newVal) {
      if (newVal === '1') {
        this.dsShow = false
        this.qyShow = false
        this.fqShow = false
        this.czShow = false
      } else if (newVal === '2') {
        this.dsShow = true
        this.qyShow = false
        this.fqShow = false
        this.czShow = false
      } else if (newVal === '3') {
        this.qyShow = true
        this.dsShow = false
        this.fqShow = false
        this.czShow = false
      } else if (newVal === '4') {
        this.fqShow = true
        this.dsShow = false
        this.qyShow = false
        this.czShow = true
      } else if (newVal === '5') {
        this.czShow = true
        this.dsShow = false
        this.qyShow = false
        this.fqShow = false
        StationBriefAll().then(res => {
          this.stationList = []
          res.data.forEach(item => {
            this.stationList.push({
              value: item.id,
              label: item.name
            })
          })
          if (res.data.length > 0) {
            this.stationId = res.data[0].id
          }
        })
      }
    },
    dsShow(newVal) {
      if (newVal) {
        if (this.cityList.length > 0) {
          this.city = this.cityList[0].value
        }
      } else {
        this.city = null
      }
    },
    qyShow(newVal) {
      if (newVal) {
        if (this.areaList.length > 0) {
          this.area = this.areaList[0].value
        }
      } else {
        this.area = null
      }
    },
    fqShow(newVal) {
      if (newVal) {
        if (this.clusterList.length > 0) {
          this.cluster = this.clusterList[0].value
        }
      } else {
        this.cluster = null
      }
    },
    czShow(newVal) {
      if (!newVal) {
        this.stationId = null
      }
    },
    cluster(newVal) {
      if (newVal) {
        this.stationList = [{ value: null, label: '全部' }]
        this.stationId = null
        ClusterStationBrief(newVal).then(res => {
          res.data.forEach(item => {
            this.stationList.push({
              value: item.id,
              label: item.name
            })
          })
        })
      } else {
        this.stationList = []
        this.stationId = ''
      }
    }
  },
  computed: {
    chartHeight() {
      return this.$store.state.app.height - 310 + 'px'
    },
    chartWidth() {
      return this.$store.state.app.width - 20 + 'px'
    }
  },
  created() {
    const todayFront = formatDate(new Date(), 'yyyy-MM-dd')

    this.dateRange = [new Date(), new Date()]
    this.getMainQuota()
    CityList2().then(res => {
      res.data.forEach(item => {
        this.cityList.push({
          value: item.id,
          label: item.name
        })
      })
    })
    ClusterList().then(res => {
      res.data.forEach(item => {
        this.clusterList.push({
          value: item.id,
          label: item.name
        })
      })
    })
    this.queryData()

    DayFocusMiss(todayFront).then(res => {
      this.focusMissList = res.data
      if (res.data.length > 0) {
        this.showFocusMiss = true
        this.oldFocusMissCount = res.data.length
      }
    })

    this.timer = setInterval(() => {
      this.getMainQuota()
      this.queryFocusMiss()
    }, 60000)
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    async showTable() {
      this.ftvisible = true
      try {
        const res = await getFtPredictedList()
        this.ftdataList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    getMainQuota() {
      MainQuota().then(res => {
        this.mainQuota = res.data
        this.PredictedCount = res.data.predictedCount
      })
    },
    viewShortMiss() {
      const day = this.mainQuota.day
      if (day) {
        DayShortMiss(day).then(res => {
          this.shortMissList = res.data
        })
      }
      this.showShortMiss = true
    },
    viewUltraShortMiss() {
      const day = this.mainQuota.day
      // const quarter = this.mainQuota.quarter
      if (day) {
        DayUltraShortMiss(day).then(res => {
          this.ultraShortMissList = res.data
        })
      }
      this.showUltraShortMiss = true
    },
    queryFocusMiss() {
      const day = this.mainQuota.day
      if (day) {
        DayFocusMiss(day).then(res => {
          const dataLength = res.data.length
          if (dataLength < this.focusMissList.length) { // 说明切换到了下一天
            this.oldFocusMissCount = 0

            if (dataLength === 0) { // 下一天漏报为0
              this.newFocusMissCount = null
            } else {
              this.newFocusMissCount = dataLength
            }
          } else { // 前后两次查询是同一天
            const newCount = dataLength - this.oldFocusMissCount
            if (newCount > 0) {
              this.newFocusMissCount = newCount
            }
          }

          this.focusMissList = res.data
        })
      }
    },
    viewFocusMiss() {
      const day = this.mainQuota.day
      if (day) {
        DayFocusMiss(day).then(res => {
          this.focusMissList = res.data
          this.oldFocusMissCount = res.data.length
        })
      }
      this.showFocusMiss = true
      this.newFocusMissCount = null
    },
    queryData() {
      this.loading = true
      const data = {
        dimension: this.dimension,
        cityId: this.city,
        areaType: this.area,
        clusterId: this.cluster,
        stationId: this.stationId,
        selForcastTypeList: this.selForcastTypeList,
        shortOffset: this.shortOffset,
        ultraShortOffset: this.ultraShortOffset,
        showWind: this.showWind,
        selWindList: this.selWindList,
        selPowerList: this.selPowerList
      }
      if (this.dateRange && this.dateRange.length > 0) {
        const startDay = formatDate(this.dateRange[0], 'yyyy-MM-dd')
        const endDay = formatDate(this.dateRange[1], 'yyyy-MM-dd')
        data.startDay = startDay
        data.endDay = endDay
      }

      CurveData(data).then(res => {
        this.$refs.windEChart.refreshCurve(data.startDay, data.endDay, res.data)
        this.loading = false
      }).catch(s_err => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.Ftext{
  cursor: pointer;
}
.power {
  width: calc(100% - 20px);
  height: calc(100% - 10px);
  //background-image: url("../../../../assets/img/bg_body.jpg");
  background-image: url("../../../../assets/img/data08.png");
  background-size: 100% 100%;
  padding: 0px 10px 10px 10px;
  .powerText {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-size: 100% 100%;
    border-radius: 5px;
    background-position-y: 9%;
    background-image: url("../../../../assets/img/bg_box3.png");
    height: 65px;
    .powerText-border {
      height: 50px;
      display: flex;
      flex-direction: column;
      width: 12%;
      justify-content: center;
      .text {
        font-size: 18px;
        color: orange;
        font-weight: bold;
        margin-top: 5px;
      }
      .text:hover {
        cursor: pointer;
      }
      .title {
        font-size: 12px;
        font-weight: bold;
        color: white;
      }
      .title:hover {
        cursor: pointer;
      }
    }
  }
  .powerEChart {
    margin-top: 10px;
    height: calc(100% - 65px);
    color: white;
    border-radius: 5px;
    background-position-y: 9%;
    background-image: url("../../../../assets/img/bg_box3.png");
    background-size: 100% 100%;
    //padding: 5px;
    .powerSel {
      padding: 0 10px;
      width: calc(100% - 20px);
      height: 50px;
      line-height: 50px;
      display: flex;
    }
  }
}
/deep/.el-checkbox {
  color: white;
}
/deep/el-radio {
  color: white;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0 5px;
  line-height: 25px;
  width: 5%;
  color: white;
}
/deep/ .el-range-editor--small .el-range-input {
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
/deep/ .el-input--small .el-input__inner {
  box-shadow: deepskyblue 0px 0px 15px inset;
  border: 0px solid deepskyblue;
  height: 32px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
/deep/ .item sup{
  top: 16px;
  right: 0;
}
</style>
