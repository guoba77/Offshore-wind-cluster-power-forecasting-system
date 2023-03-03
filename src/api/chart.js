import request from '@/utils/request'

// export function findChartsByPage(body) {
//   return request({
//     url: '/csvTable/findByPage',
//     method: 'post',
//     data: body
//   })
// }
//
// export function findBriefCharts(data) {
//   return request({
//     url: '/csvTable/findNumberOf',
//     method: 'post',
//     data: data
//   })
// }
//
// export function deleteChart(chartID) {
//   return request({
//     url: '/csvTable/delete',
//     method: 'post',
//     data: {
//       chartID
//     }
//   })
// }
//
// export function getDataByIDList(ids) {
//   return request({
//     url: '/csvTable/findByIds',
//     method: 'post',
//     data: {
//       ids
//     }
//   })
// }
//
// // 下拉框查询
// export function findTreeByName(data) {
//   return request({
//     url: '/csvTable/findTreeByName',
//     method: 'post',
//     data: data
//   })
// }
// // csv新增
// export function csvTableAdd(data) {
//   return request({
//     url: '/csvTable/add',
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
//     },
//     method: 'post',
//     data: data
//   })
// }
// // csv图表删除
// export function csvTableDel(id) {
//   return request({
//     url: '/csvTable/deleteById?id=' + id,
//     method: 'post',
//     id: id
//   })
// }
// // csv修改
// export function csvTableEdit(data) {
//   return request({
//     url: '/csvTable/update',
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
//     },
//     method: 'post',
//     data: data
//   })
// }
// // 列下拉框查询
// export function findDataByName(data) {
//   return request({
//     url: '/csvTable/findDataByName',
//     method: 'post',
//     data: data
//   })
// }
// // 列下拉框查询
// export function assembleTheChart(data) {
//   return request({
//     url: '/csvTable/assembleTheChart',
//     method: 'post',
//     data: data
//   })
// }
// // 批量导出
// export function downExportZip(data) {
//   return request({
//     url: '/csvTable/exportZip',
//     method: 'post',
//     responseType: 'blob',
//     data: data
//   })
// }
// // 批量导入
// export function importZip(data) {
//   return request({
//     url: '/csvTable/importZip',
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
//     },
//     method: 'post',
//     data: data
//   })
// }
// // 图表新增
// export function addByDropDownData(data) {
//   return request({
//     url: '/csvTable/addByDropDownData',
//     method: 'post',
//     data: data
//   })
// }
// // show页面图表分页
// export function queryHomePage(data) {
//   return request({
//     url: '/csvTable/queryHomePage',
//     method: 'post',
//     data: data
//   })
// }
// // 子分页加载
// export function queryAppNamePage(data) {
//   return request({
//     url: '/csvTable/queryAppNamePage',
//     method: 'post',
//     data: data
//   })
// }
// // 图标页四个卡片
// export function queryAppCard(data) {
//   return request({
//     url: '/csvTable/queryAppCard',
//     method: 'post',
//     data: data
//   })
// }
