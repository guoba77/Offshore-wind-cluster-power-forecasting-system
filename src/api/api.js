import request from '../utils/request'

// 登录-------------------------------------------------------------
export function Login(data) {
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}

// 管理端-----------------------------------------------------------
// 场站分页
export function TableList(data) {
  return request({
    url: 'bizstation/list',
    method: 'post',
    data
  })
}
// 新增场站
export function TableAdd(data) {
  return request({
    url: 'bizstation/save',
    method: 'post',
    data
  })
}
// 修改场站
export function TableUpdate(data) {
  return request({
    url: 'bizstation/update',
    method: 'post',
    data
  })
}
// 查询场站
export function TableQuery(id) {
  return request({
    url: 'bizstation/info/' + id,
    method: 'get'
  })
}
// 删除场站
export function TableDel(id) {
  return request({
    url: 'bizstation/updateDel',
    method: 'post',
    params: {
      id: id
    }
  })
}
// 查询所有省
export function ProvinceList() {
  return request({
    url: 'bizprovince/provinceList',
    method: 'get'
  })
}
// 查询所有地级市
export function CityList(id) {
  return request({
    url: 'bizcity/cityList?proviceId=' + id,
    method: 'get'
  })
}
// 查询所有地级市(本项目指定省份)
export function CityList2() {
  return request({
    url: 'bizcity/cityList2',
    method: 'get'
  })
}
// 查询所有分群
export function ClusterList() {
  return request({
    url: 'bizcluster/getAll',
    method: 'get'
  })
}
// 用户端 主站-----------------------------------------------------------
// 左侧子站树
export function SubSationMenu() {
  return request({
    url: 'bizprovince/queryProvinceCityStationResDTOList',
    method: 'post'
  })
}
// 当天短期上报情况
export function ShortTermReporting(time) {
  return request({
    url: 'biz/bizreportuploadshort/queryReportUploadShortResDtoZk?time=' + time,
    method: 'get'
  })
}
// 当前时刻超短期上报情况
export function UltraShortTermReporting(time) {
  return request({
    url: 'biz/bizreportuploadultrashort/queryReportUploadUltraShortResDtoZk?time=' + time,
    method: 'get'
  })
}
// 上月短期预测准确率TOP10排行
export function LastMonthRankTop10(month) {
  return request({
    url: 'biz/bizreportaccuracymonthlyshort/monthRankTop10?month=' + month,
    method: 'get'
  })
}
// 上月超短期预测准确率TOP10排行
export function UltraShortTermTop10(month) {
  return request({
    url: 'biz/bizreportaccuracymonthlyultrashort/monthRankTop10?month=' + month,
    method: 'get'
  })
}
// 用户端 子站-----------------------------------------------------------
// 日度概览------------------------------------------------------------------------
// 子站日度短期功率预测
export function CountStationDayUpload(data) {
  return request({
    url: 'biz/bizforcastshort/countStationDayUpload',
    method: 'post',
    data
  })
}
// 子站日度超短期功率预测
export function StationQuarterView(data) {
  return request({
    url: 'biz/bizforcastultrashort/getStationQuarterView',
    method: 'post',
    data
  })
}
// 子站次日短期上报详情
export function QueryForcastList(data) {
  return request({
    url: 'biz/bizforcastnextdayshort/queryForcastList',
    method: 'post',
    data
  })
}
// 子站第十五分钟超短期上报详情
export function NextQueryForcastList(data) {
  return request({
    url: 'biz/bizforcastnextquarterultrashort/queryForcastList',
    method: 'post',
    data
  })
}
// 子站实际与预测数据对比图
export function DayData(data) {
  return request({
    url: 'biz/bizrealpower/getDayData',
    method: 'post',
    data
  })
}
// 月度概览------------------------------------------------------------------------
// 子站月度短期功率预测
export function MonthReportUploadShort(data) {
  return request({
    url: 'biz/bizreportuploadshort/monthReport',
    method: 'post',
    data
  })
}
// 子站月度超短期功率预测
export function MonthReport(data) {
  return request({
    url: 'biz/bizreportuploadultrashort/monthReport',
    method: 'post',
    data
  })
}
// 子站月度短期次日功率预测每日合格率
export function IsNoQualifyResDTOList(data) {
  return request({
    url: 'biz/bizforcastnextdayshort/dayQualifyRateInMonth',
    method: 'post',
    data
  })
}
// 子站月度超短期功率预测每日上报率
export function DayUploadRateInMonth(data) {
  return request({
    url: 'biz/bizreportuploadultrashort/dayUploadRateInMonth',
    method: 'post',
    data
  })
}
// 子站月度超短期第15分钟功率预测每日合格率
export function DayQualifyRateInMonth(data) {
  return request({
    url: 'biz/bizforcastnextquarterultrashort/dayQualifyRateInMonth',
    method: 'post',
    data
  })
}
// 当前上报情况
export function CurrentUploadView() {
  return request({
    url: 'bizstation/currentUploadView',
    method: 'post'
  })
}

export function StationBriefAll() {
  return request({
    url: 'bizstation/briefAll',
    method: 'post'
  })
}

export function StationBriefAll2() {
  return request({
    url: 'bizstation/briefAll2',
    method: 'post'
  })
}

export function ClusterStationBrief(clusterId) {
  return request({
    url: 'bizstation/findBriefByCluster?clusterId=' + clusterId,
    method: 'get'
  })
}

export function MainQuota() {
  return request({
    url: 'bizpowerforcast/mainQuota',
    method: 'post'
  })
}

export function CurveData(data) {
  return request({
    url: 'bizpowerforcast/curveData',
    method: 'post',
    data
  })
}

export function FindReportHistory(data) {
  return request({
    url: 'bizstation/uploadFileView',
    method: 'post',
    data
  })
}

export function GetUploadFileContent(fileName) {
  return request({
    url: 'bizstation/getUploadFileContent?fileName=' + fileName,
    method: 'get'
  })
}

export function DayShortMiss(day) {
  return request({
    url: 'bizpowerforcast/getDayShortMiss?day=' + day,
    method: 'get'
  })
}

export function DayUltraShortMiss(day) {
  return request({
    url: 'bizpowerforcast/getDayUltraShortMiss?day=' + day,
    method: 'get'
  })
}

export function DayFocusMiss(day) {
  return request({
    url: 'bizpowerforcast/getDayFocusMiss?day=' + day,
    method: 'get'
  })
}

export function QuarterUltraShortMiss(quarter) {
  return request({
    url: 'bizpowerforcast/getQuarterUltraShortMiss?quarter=' + quarter,
    method: 'get'
  })
}

export function getMonthAssess(month, data) {
  return request({
    url: 'bizpowerforcast/getMonthAssess?month=' + month,
    method: 'get',
    params: data
  })
}

export function getStationDailyAssessInMonth(stationId, month) {
  return request({
    url: 'bizpowerforcast/getStationDailyAssessInMonth?stationId=' + stationId + '&month=' + month,
    method: 'get'
  })
}

export function getStationDayPower(stationId, day) {
  return request({
    url: 'bizpowerforcast/getStationDayPower?stationId=' + stationId + '&day=' + day,
    method: 'get'
  })
}
// 获取方天预测列表
export function getFtPredictedList() {
  return request({
    url: '/bizstation/findAllStation',
    method: 'post'
  })
}

// 切换场站重点关注的状态
export function SwitchFocus(id, focus) {
  return request({
    url: '/bizstation/switchFocus',
    method: 'post',
    data: {
      id,
      focus
    }
  })
}
