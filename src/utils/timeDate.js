import moment from 'moment'

export function getTimeDate() {
  if (moment().format('mm') >= '00' && moment().format('mm') < '15') {
    const timeDate = moment().format('HH:' + '00')
    return timeDate
  } else if (moment().format('mm') >= '15' && moment().format('mm') < '30') {
    const timeDate = moment().format('HH:' + '15')
    return timeDate
  } else if (moment().format('mm') >= '30' && moment().format('mm') < '45') {
    const timeDate = moment().format('HH:' + '30')
    return timeDate
  } else if (moment().format('mm') >= '45' && moment().format('mm') <= '59') {
    const timeDate = moment().format('HH:' + '45')
    return timeDate
  }
}

export function getMonthLength(date) {
  const d = new Date(date)
  // 将日期设置为下月一号
  d.setMonth(d.getMonth() + 1)
  d.setDate('1')
  // 获取本月最后一天
  d.setDate(d.getDate() - 1)
  return d.getDate()
}
