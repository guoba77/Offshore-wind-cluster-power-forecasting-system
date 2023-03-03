// 4-10位用户名正则验算
export function nameRuler(rule, value, callback) {
  var reg = /(^[a-zA-Z0-9_-]{4,10}$)/ // 4-10位正则用户名验算
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入4-10位用户名'))
  } else {
    callback()
  }
}

// 6-12位正则密码验算需要包含大小写字母和数字以及特殊字符
export function passRuler(rule, value, callback) {
  // const reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/ // 6-12位正则密码验算
  const reg = /(^[a-zA-Z0-9_-]{6,10}$)/ // 6-12位正则密码验算
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!reg.test(value)) {
    // callback(new Error('请输入6-12位密码需要包含大小写字母和数字以及特殊字符'))
    callback(new Error('请输入6-10位密码'))
  } else {
    callback()
  }
}
