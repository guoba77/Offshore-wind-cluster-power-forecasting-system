<template>
  <div
    class="ReportingFile"
    v-loading="loading"
    element-loading-text="Loading..."
  >
    <div class="fileSel">
      <span>日期范围：</span>
      <el-date-picker
        v-model="dateList"
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
      <span>场站：</span>
      <el-select
        v-model="stationId"
        size="small"
        filterable
        style="width: 150px"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="
          vertical-align: middle;
          background-color: rgba(0, 0, 0, 0);
          width: 100px;
          font-size: 14px;
          box-shadow: deepskyblue 0px 0px 15px inset;
          border: 0px solid deepskyblue;
        "
        type="primary"
        size="small"
        plain
        @click="findTransferHis"
        >查询</el-button
      >
    </div>
    <div class="fileTitle">
      <div class="fileTitle-text" v-show="selStationName">
        <div>
          <span style="color: orange; padding-right: 5px">{{
            selStationName
          }}</span
          >在
          <span style="color: orange; padding-right: 5px">{{
            selStartDay
          }}</span>
          至
          <span style="color: orange; padding-right: 5px">{{ selEndDay }}</span>
          短期上报
        </div>
        <span
          >上报次数:
          <span style="color: orange; padding-right: 10px">{{}}</span>
          漏报次数：<span style="color: orange">{{}}</span>
        </span>
      </div>
      <div class="fileTitle-text" v-show="selStationName">
        <div>
          <span style="color: orange; padding-right: 5px">{{
            selStationName
          }}</span
          >在
          <span style="color: orange; padding-right: 5px">{{
            selStartDay
          }}</span>
          至
          <span style="color: orange; padding-right: 5px">{{ selEndDay }}</span>
          超短期上报
        </div>
        <span
          >上报次数:
          <span style="color: orange; padding-right: 10px">{{}}</span>
          漏报次数：<span style="color: orange">{{}}</span></span
        >
      </div>
    </div>
    <div style="height: calc(100% - 95px); width: 50%; float: left">
      <el-table
        ref="table"
        :data="tableData"
        :height="height"
        @cell-click="viewTransferDetail"
        size="small"
        class="fileTable"
      >
        <el-table-column prop="seq" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="stationName"
          label="场站"
          width="156"
        ></el-table-column>
        <el-table-column
          prop="fileName"
          label="传输文件名"
          class-name="file-name"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="传输结束时间"
          width="140"
        ></el-table-column>
        <el-table-column prop="status" label="传输结果" width="100">
          <template slot-scope="scope">
            <span v-html="getStatusHtml(scope.row.status)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      style=""
      class="fileTxt"
      :style="{ height: height + 10 + 'px' }"
      v-loading="loadingTransferDetail"
    >
      <div ref="shortDiv" class="txt-text">
        {{ transferLog }}
        <!-- <p v-for="item in transferLogList" :key="index">
          <span>{{item.time}}</span>: 
          <span>{{item.log}}</span>
        </p> -->
      </div>
      <div ref="ultraShortDiv" class="txt-text" v-text="wpdFileContent"></div>
    </div>
  </div>
</template>

<script>
import { StationBriefAll } from '@/api/api'
// import { formatDate } from '@/utils/date'

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      loadingTransferDetail: false,
      options: [{ label: '全部', value: null }],
      stationId: null,
      dateList: '',
      selStartDay: null,
      selEndDay: null,
      selStationName: null,
      tableData: [
        { seq: 1, stationName: '场站1', fileName: 'DHLNFD_20220705_0000_DQ.WPD', endTime: '2022-07-04 09:34:56', status: 1 },
        { seq: 2, stationName: '场站1', fileName: 'DHLNFD_20220705_0000_DQ.WPD', endTime: '2022-07-04 14:01:24', status: 0 }
      ],
      wpdFileContent: '',
      transferLog: '',
      transferLogList: [
        { time: '2022-07-04 09:34:51', log: '场站召唤二级数据' }
      ]
    }
  },
  computed: {
    height() {
      return this.$store.state.app.height - 167
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
  methods: {
    getAllStation() {
      StationBriefAll().then(res => {
        this.options = [{
          label: '全部',
          value: null
        }]
        res.data.forEach(item => {
          this.options.push({
            value: item.id,
            label: item.name
          })
        })
      })
    },
    findTransferHis() {
      // this.loading = true
      // let startDay = null
      // let endDay = null
      // if (this.dateList && this.dateList.length > 0) {
      //   startDay = formatDate(this.dateList[0], 'yyyy-MM-dd')
      //   endDay = formatDate(this.dateList[1], 'yyyy-MM-dd')
      // }
      // const stationId = this.stationId
      // FindReportHistory({ startDay, endDay, stationId }).then(res => {
      //   this.wpdFileContent = ''

      //   this.selStartDay = startDay
      //   this.selEndDay = endDay
      //   for (let i = 0; i < this.options.length; i++) {
      //     if (this.stationId === this.options[i].value) {
      //       this.selStationName = this.options[i].label
      //       break
      //     }
      //   }

      //   this.tableData = []
      //   res.data.shortFileList.forEach((item, index) => {
      //     this.tableData.push({
      //       seq: index + 1,
      //       time: item.time,
      //       uploadTime: item.uploadTime,
      //       fileName: item.fileName,
      //       status: item.status
      //     })
      //   })

      //   this.loading = false
      // }).catch(s_err => {
      //   this.loading = false
      // })
    },
    getStatusHtml(status) {
      if (status === 1) {
        return '<span class="ok-text">传输成功</span>'
      } else {
        return '<span class="err-text">传输失败</span>'
      }
    },
    viewTransferDetail(row, column) {
      if (column.property === 'fileName') {
        const fileName = row.fileName
        if (fileName) {
          // this.$refs.shortDiv.scrollTop = 0
          // this.loadingTransferDetail = true
          // GetUploadFileContent(fileName).then(res => {
          //   this.loadingTransferDetail = false
          // }).catch(s_err => {
          //   this.loadingTransferDetail = false
          // })
          this.transferLog = '2022-07-04 09:34:51: 场站召唤二级数据\r\n2022-07-04 09:34:51: 主站将ACD位置为1并回复\r\n2022-07-04 09:34:52: 场站召唤一级数据\r\n2022-07-04 09:34:52: 主站回复数据帧\r\n2022-07-04 09:34:52: 场站召唤一级数据\r\n2022-07-04 09:34:52: 主站回复数据帧\r\n2022-07-04 09:34:52: ...'
          this.wpdFileContent = '<! Entity=DHLNFD type=DQ time=\'2022-07-05_00:00\' !>\r\n\r\n<Capacity::DHLNFD>\r\n@id   装机容量\r\n#1    98.700\r\n</Capacity::DHLNFD>\r\n\r\n<ShortTermForcast::DHLNFD>\r\n@id 短期预测功率 预计开机容量\r\n#1    18.426    98.700\r\n#2    16.806    98.700\r\n#3    15.388    98.700\r\n#4    13.969    98.700\r\n#5    12.551    98.700\r\n#6    11.426    98.700\r\n#7    10.594    98.700\r\n#8    9.442    98.700\r\n#9    9.748    98.700\r\n#10    9.484    98.700\r\n#11    9.670    98.700\r\n#12    9.590    98.700\r\n#13    9.679    98.700\r\n#14    9.738    98.700\r\n#15    9.633    98.700\r\n#16    9.610    98.700\r\n#17    9.598    98.700\r\n#18    9.570    98.700\r\n#19    9.440    98.700\r\n#20    9.524    98.700\r\n#21    9.614    98.700\r\n#22    9.733    98.700\r\n#23    9.641    98.700\r\n#24    9.577    98.700\r\n#25    9.608    98.700\r\n#26    9.738    98.700\r\n#27    9.711    98.700\r\n#28    9.396    98.700\r\n#29    9.632    98.700\r\n#30    9.651    98.700\r\n#31    9.538    98.700\r\n#32    9.417    98.700\r\n#33    9.521    98.700\r\n#34    9.527    98.700\r\n#35    9.746    98.700\r\n#36    9.465    98.700\r\n#37    9.527    98.700\r\n#38    9.709    98.700\r\n#39    9.723    98.700\r\n#40    9.736    98.700\r\n#41    9.622    98.700\r\n#42    9.553    98.700\r\n#43    9.583    98.700\r\n#44    9.510    98.700\r\n#45    9.761    98.700\r\n#46    9.611    98.700\r\n#47    9.518    98.700\r\n#48    9.444    98.700\r\n#49    9.509    98.700\r\n#50    9.632    98.700\r\n#51    9.628    98.700\r\n#52    9.452    98.700\r\n#53    9.556    98.700\r\n#54    9.743    98.700\r\n#55    9.466    98.700\r\n#56    9.509    98.700\r\n#57    9.701    98.700\r\n#58    9.605    98.700\r\n#59    9.763    98.700\r\n#60    9.749    98.700\r\n#61    9.751    98.700\r\n#62    10.893    98.700\r\n#63    12.694    98.700\r\n#64    14.495    98.700\r\n#65    16.296    98.700\r\n#66    17.999    98.700\r\n#67    19.605    98.700\r\n#68    21.210    98.700\r\n#69    22.816    98.700\r\n#70    24.013    98.700\r\n#71    24.800    98.700\r\n#72    25.587    98.700\r\n#73    26.374    98.700\r\n#74    27.027    98.700\r\n#75    27.545    98.700\r\n#76    28.063    98.700\r\n#77    28.581    98.700\r\n#78    29.523    98.700\r\n#79    30.889    98.700\r\n#80    32.255    98.700\r\n#81    33.621    98.700\r\n#82    34.851    98.700\r\n#83    35.944    98.700\r\n#84    37.037    98.700\r\n#85    38.130    98.700\r\n#86    38.860    98.700\r\n#87    39.229    98.700\r\n#88    39.597    98.700\r\n#89    39.966    98.700\r\n#90    40.200    98.700\r\n#91    40.299    98.700\r\n#92    40.398    98.700\r\n#93    40.497    98.700\r\n#94    39.773    98.700\r\n#95    38.228    98.700\r\n#96    36.683    98.700\r\n#97    35.138    98.700\r\n#98    33.536    98.700\r\n#99    31.877    98.700\r\n#100    30.218    98.700\r\n#101    28.559    98.700\r\n#102    27.385    98.700\r\n#103    26.697    98.700\r\n#104    26.009    98.700\r\n#105    25.321    98.700\r\n#106    24.803    98.700\r\n#107    24.454    98.700\r\n#108    24.105    98.700\r\n#109    23.756    98.700\r\n#110    23.349    98.700\r\n#111    22.884    98.700\r\n#112    22.419    98.700\r\n#113    21.954    98.700\r\n#114    21.985    98.700\r\n#115    22.512    98.700\r\n#116    23.039    98.700\r\n#117    23.566    98.700\r\n#118    23.569    98.700\r\n#119    23.050    98.700\r\n#120    22.531    98.700\r\n#121    22.012    98.700\r\n#122    21.039    98.700\r\n#123    19.614    98.700\r\n#124    18.189    98.700\r\n#125    16.764    98.700\r\n#126    15.686    98.700\r\n#127    14.955    98.700\r\n#128    14.224    98.700\r\n#129    13.493    98.700\r\n#130    12.936    98.700\r\n#131    12.551    98.700\r\n#132    12.167    98.700\r\n#133    11.782    98.700\r\n#134    11.701    98.700\r\n#135    11.923    98.700\r\n#136    12.146    98.700\r\n#137    12.368    98.700\r\n#138    12.870    98.700\r\n#139    13.652    98.700\r\n#140    14.435    98.700\r\n#141    15.217    98.700\r\n#142    15.491    98.700\r\n#143    15.257    98.700\r\n#144    15.022    98.700\r\n#145    14.788    98.700\r\n#146    14.881    98.700\r\n#147    15.300    98.700\r\n#148    15.719    98.700\r\n#149    16.138    98.700\r\n#150    16.385    98.700\r\n#151    16.459    98.700\r\n#152    16.532    98.700\r\n#153    16.606    98.700\r\n#154    17.066    98.700\r\n#155    17.912    98.700\r\n#156    18.758    98.700\r\n#157    19.604    98.700\r\n#158    20.328    98.700\r\n#159    20.930    98.700\r\n#160    21.532    98.700\r\n#161    22.134    98.700\r\n#162    22.600    98.700\r\n#163    22.929    98.700\r\n#164    23.258    98.700\r\n#165    23.587    98.700\r\n#166    23.796    98.700\r\n#167    23.885    98.700\r\n#168    23.974    98.700\r\n#169    24.063    98.700\r\n#170    24.704    98.700\r\n#171    25.898    98.700\r\n#172    27.093    98.700\r\n#173    28.287    98.700\r\n#174    29.006    98.700\r\n#175    29.251    98.700\r\n#176    29.495    98.700\r\n#177    29.740    98.700\r\n#178    30.388    98.700\r\n#179    31.440    98.700\r\n#180    32.493    98.700\r\n#181    33.545    98.700\r\n#182    33.889    98.700\r\n#183    33.525    98.700\r\n#184    33.161    98.700\r\n#185    32.797    98.700\r\n#186    32.470    98.700\r\n#187    32.179    98.700\r\n#188    31.889    98.700\r\n#189    31.598    98.700\r\n#190    30.717    98.700\r\n#191    29.245    98.700\r\n#192    27.774    98.700\r\n#193    26.302    98.700\r\n#194    25.030    98.700\r\n#195    23.958    98.700\r\n#196    22.887    98.700\r\n#197    21.815    98.700\r\n#198    20.587    98.700\r\n#199    19.204    98.700\r\n#200    17.821    98.700\r\n#201    16.438    98.700\r\n#202    15.601    98.700\r\n#203    15.311    98.700\r\n#204    15.021    98.700\r\n#205    14.731    98.700\r\n#206    14.623    98.700\r\n#207    14.696    98.700\r\n#208    14.769    98.700\r\n#209    14.842    98.700\r\n#210    14.566    98.700\r\n#211    13.942    98.700\r\n#212    13.319    98.700\r\n#213    12.695    98.700\r\n#214    12.034    98.700\r\n#215    11.335    98.700\r\n#216    10.636    98.700\r\n#217    9.937    98.700\r\n#218    9.488    98.700\r\n#219    9.669    98.700\r\n#220    9.745    98.700\r\n#221    9.758    98.700\r\n#222    9.449    98.700\r\n#223    9.377    98.700\r\n#224    9.415    98.700\r\n#225    9.489    98.700\r\n#226    9.650    98.700\r\n#227    9.673    98.700\r\n#228    9.679    98.700\r\n#229    9.458    98.700\r\n#230    9.535    98.700\r\n#231    9.643    98.700\r\n#232    9.694    98.700\r\n#233    9.379    98.700\r\n#234    9.735    98.700\r\n#235    9.405    98.700\r\n#236    9.412    98.700\r\n#237    9.681    98.700\r\n#238    9.393    98.700\r\n#239    9.418    98.700\r\n#240    9.597    98.700\r\n#241    9.612    98.700\r\n#242    9.657    98.700\r\n#243    9.383    98.700\r\n#244    9.485    98.700\r\n#245    9.482    98.700\r\n#246    9.597    98.700\r\n#247    10.099    98.700\r\n#248    11.190    98.700\r\n#249    12.280    98.700\r\n#250    13.249    98.700\r\n#251    14.097    98.700\r\n#252    14.946    98.700\r\n#253    15.794    98.700\r\n#254    16.696    98.700\r\n#255    17.653    98.700\r\n#256    18.609    98.700\r\n#257    19.566    98.700\r\n#258    20.412    98.700\r\n#259    21.149    98.700\r\n#260    21.886    98.700\r\n#261    22.623    98.700\r\n#262    23.025    98.700\r\n#263    23.092    98.700\r\n#264    23.159    98.700\r\n#265    23.226    98.700\r\n#266    23.709    98.700\r\n#267    24.607    98.700\r\n#268    25.505    98.700\r\n#269    26.403    98.700\r\n#270    27.469    98.700\r\n#271    28.703    98.700\r\n#272    29.937    98.700\r\n#273    31.171    98.700\r\n#274    31.841    98.700\r\n#275    31.946    98.700\r\n#276    32.051    98.700\r\n#277    32.156    98.700\r\n#278    32.092    98.700\r\n#279    31.859    98.700\r\n#280    31.626    98.700\r\n#281    31.393    98.700\r\n#282    30.878    98.700\r\n#283    30.082    98.700\r\n#284    29.286    98.700\r\n#285    28.490    98.700\r\n#286    27.414    98.700\r\n#287    26.058    98.700\r\n#288    24.703    98.700\r\n</ShortTermForcast::DHLNFD>'
        }
      }
    }
  },
  created() {
    this.getAllStation()
    this.dateList = [new Date(), new Date()]
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
/deep/ td.file-name {
  cursor: pointer;
}
/deep/ td.file-name:hover {
  text-decoration: underline;
}
.ReportingFile {
  width: 100%;
  height: 100%;
  //background-image: url("../../../../assets/img/bg_body.jpg");
  background-image: url("../../../../assets/img/data08.png");
  .fileSel {
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
  }
  .fileTitle {
    height: 35px;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0 10px;
    justify-content: space-between;
    color: white;
    .fileTitle-text {
      width: 49%;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      //border: 1px solid #ffffff;
      border-radius: 5px;
      div,
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .fileTable {
    margin: 0px 10px 10px 10px;
    width: calc(100% - 20px);
    user-select: none;
  }
  .fileTxt {
    width: 50%;
    float: left;
    justify-content: space-between;
    .txt-text {
      letter-spacing: 1px;
      font-size: 14px;
      overflow-y: auto;
      white-space: pre-line;
      padding: 10px;
      display: flex;
      text-align: left;
      border-radius: 5px;
      background-position-y: 9%;
      background: url("../../../../assets/img/bg_box3.png") no-repeat;
      color: white;
      background-size: 100% 100%;
      height: calc(50% - 32px);
      width: calc(100% - 32px);
      margin-bottom: 10px;
      border: 1px solid deepskyblue;
      //margin: 5px;
    }
  }
}
/deep/ .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: deepskyblue;
}
/deep/ .el-table__body td {
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
  text-align: center;
}
/deep/.el-table thead.is-group th {
  background: #f5f7fa;
  text-align: center;
}
/deep/.el-table th.is-leaf {
  //border-bottom: 1px solid #EBEEF5;
  text-align: center;
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
// 表格样式
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
  box-shadow: deepskyblue 0px 0px 15px inset;
  border: 1px solid deepskyblue;
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
