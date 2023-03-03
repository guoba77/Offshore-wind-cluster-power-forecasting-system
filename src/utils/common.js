export function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function() {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}
