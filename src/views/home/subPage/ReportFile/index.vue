<template>
  <div
    class="ReportingFile"
    v-loading="loading"
    element-loading-text="Loading..."
  >
    <div class="fileSel">
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
        @click="findReportHis"
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
          <span style="color: orange; padding-right: 10px">{{
            shortUploadedCount
          }}</span>
          漏报次数：<span style="color: orange">{{ shortOmissionCount }}</span>
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
          <span style="color: orange; padding-right: 10px">{{
            ultraShortUploadedCount
          }}</span>
          漏报次数：<span style="color: orange">{{
            ultraShortOmissionCount
          }}</span></span
        >
      </div>
    </div>
    <div style="display: flex">
      <el-table
        ref="table1"
        :data="tableData"
        :height="height1"
        @cell-click="viewShortFile"
        size="small"
        class="fileTable"
      >
        <el-table-column prop="seq" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="time"
          label="时间点"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上报时间"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          class-name="file-name"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-html="getStatusHtml(scope.row.status)"></span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        ref="table2"
        :data="tableData2"
        :height="height1"
        @cell-click="viewUltraShortFile"
        size="small"
        class="fileTable"
      >
        <el-table-column prop="seq" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="time"
          label="时间点"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上报时间"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          class-name="file-name"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-html="getStatusHtml(scope.row.status)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div :style="{ height: height2 }" class="fileTxt">
      <div ref="shortDiv" class="txt-text" v-loading="loadingShortFile">
        {{ shortFileContent }}
      </div>
      <div
        ref="ultraShortDiv"
        class="txt-text"
        v-loading="loadingUltraShortFile"
      >
        {{ ultraShortFileContent }}
      </div>
    </div>
  </div>
</template>

<script>
import { StationBriefAll, FindReportHistory, GetUploadFileContent } from '@/api/api'
import { formatDate } from '@/utils/date'

export default {
  name: 'index',
  data() {
    return {
      loading: false,
      loadingShortFile: false,
      loadingUltraShortFile: false,
      shortFileContent: '',
      ultraShortFileContent: '',
      options: [],
      stationId: '',
      dateList: '',
      shortUploadedCount: null,
      shortOmissionCount: null,
      ultraShortUploadedCount: null,
      ultraShortOmissionCount: null,
      selStartDay: null,
      selEndDay: null,
      selStationName: null,
      tableData: [],
      tableData2: []
    }
  },
  computed: {
    height1() {
      return this.$store.state.app.height * 3 / 5 - 90 + 'px'
    },
    height2() {
      return this.$store.state.app.height * 2 / 5 - 90 + 'px'
    }
  },
  created() {
    this.getAllStation()
    this.dateList = [new Date(), new Date()]
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
    }
  },
  methods: {
    getAllStation() {
      StationBriefAll().then(res => {
        this.options = []
        res.data.forEach(item => {
          this.options.push({
            value: item.id,
            label: item.name
          })
        })
        if (res.data.length) {
          this.stationId = res.data[0].id
        }
      })
    },
    findReportHis() {
      this.loading = true
      let startDay = null
      let endDay = null
      if (this.dateList && this.dateList.length > 0) {
        startDay = formatDate(this.dateList[0], 'yyyy-MM-dd')
        endDay = formatDate(this.dateList[1], 'yyyy-MM-dd')
      }
      const stationId = this.stationId
      FindReportHistory({ stationId, startDay, endDay }).then(res => {
        this.shortFileContent = ''
        this.ultraShortFileContent = ''

        this.selStartDay = startDay
        this.selEndDay = endDay
        for (let i = 0; i < this.options.length; i++) {
          if (this.stationId === this.options[i].value) {
            this.selStationName = this.options[i].label
            break
          }
        }
        this.shortUploadedCount = res.data.shortUploadedCount
        this.ultraShortUploadedCount = res.data.ultraShortUploadedCount
        this.shortOmissionCount = res.data.shortOmissionCount
        this.ultraShortOmissionCount = res.data.ultraShortOmissionCount

        this.tableData = []
        this.tableData2 = []
        res.data.shortFileList.forEach((item, index) => {
          this.tableData.push({
            seq: index + 1,
            time: item.time,
            uploadTime: item.uploadTime,
            fileName: item.fileName,
            status: item.status
          })
        })
        res.data.ultraShortFileList.forEach((item, index) => {
          this.tableData2.push({
            seq: index + 1,
            time: item.time,
            uploadTime: item.uploadTime,
            fileName: item.fileName,
            status: item.status
          })
        })

        this.loading = false
      }).catch(s_err => {
        this.loading = false
      })
    },
    getStatusHtml(status) {
      if (status === 0) {
        return '<span class="err-text">延迟上报</span>'
      } else if (status === 1) {
        return '<span class="ok-text">正常</span>'
      } else if (status === 2) {
        return '<span class="err-text">未按时上报</span>'
      } else if (status === 3) {
        return '<span class="err-text">格式错误</span>'
      } else if (status === 4) {
        return '<span class="err-text">时长不足</span>'
      } else {
        return '<span class="err-text">未知状态</span>'
      }
    },
    viewShortFile(row, column) {
      if (column.property === 'fileName') {
        const fileName = row.fileName
        if (fileName) {
          this.$refs.shortDiv.scrollTop = 0
          this.loadingShortFile = true
          GetUploadFileContent(fileName).then(res => {
            this.shortFileContent = res.data
            this.loadingShortFile = false
          }).catch(s_err => {
            this.loadingShortFile = false
          })
        }
      }
    },
    viewUltraShortFile(row, column) {
      if (column.property === 'fileName') {
        const fileName = row.fileName
        if (fileName) {
          this.$refs.ultraShortDiv.scrollTop = 0
          this.loadingUltraShortFile = true
          GetUploadFileContent(fileName).then(res => {
            this.ultraShortFileContent = res.data
            this.loadingUltraShortFile = false
          }).catch(s_err => {
            this.loadingUltraShortFile = false
          })
        }
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
    width: calc(50% - 20px);
    user-select: none;
  }
  .fileTxt {
    width: calc(100% - 20px);
    display: flex;
    margin: 0 10px;
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
      height: calc(100% - 20px);
      width: calc(50% - 32px);
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
