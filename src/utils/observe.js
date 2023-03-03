class Observe {
  constructor() {
    this.fnsObj = {}
  }
  // 订阅方法
  on(key, fn) {
    if (!this.fnsObj[key]) {
      this.fnsObj[key] = []
    }
    this.fnsObj[key].push(fn)
  }
  // 发布
  emmit(key, value) {
    if (this.fnsObj[key] && this.fnsObj[key].length) {
      var fns = this.fnsObj[key]
      for (let i = 0; i < fns.length; i++) {
        fns[i].call(this, value)
      }
    }
  }
  // 删除订阅者
  remove(key) {
    for (var k in this.fnsObj) {
      if (k === key) {
        delete (this.fnsObj[k])
      }
    }
  }
}

const observeMQ = new Observe()

export default observeMQ
