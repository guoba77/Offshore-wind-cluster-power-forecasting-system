<template>
  <div id="myChart4" :style="{width: '100%', height: '300px'}"></div>
</template>

<script>
import { getMonthLength } from '../../../utils/timeDate'
import moment from 'moment'
export default {
  name: 'ShortTermPowerChart',
  props: {
    dataList: { type: Array },
    num: { type: Number },
    month: { type: String }
  },
  data() {
    return {
      xData: [],
      yData1: [],
      yData2: [],
      myChart: {}
    }
  },
  computed: {
    monitor() {
      return this.$store.state.tree.showChars
    }
  },
  watch: {
    monitor() {
      return (this.myChart.dispose(), this.drawLine())
    },
    num: {
      handler: function(val) {
        this.xData = []
        this.yData1 = []
        this.yData2 = []
        const day = getMonthLength(this.month + '-1')
        for (let i = 1; i <= day; i++) {
          const month = moment(this.month).format('MM')
          if (i < 9 && i > 0) {
            i = '0' + i
          }
          this.xData.push(month + '-' + i)
        }
        this.dataList.forEach((item) => {
          this.yData1.push(item.uploadCount)
          this.yData2.push(item.uploadRate)
        })
        this.drawLine()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(_ => {
        const myChart = this.$echarts.init(document.getElementById('myChart4'))

        var data = this.xData
        // 绘制图表
        const option = {
          color: ['#FF4E4E', '#FF9F41', '#3095FB', '#31BA91'],
          series: [
            {
              type: 'line',
              // name: '',
              symbolSize: 10,
              symbol: 'circle',
              data: this.yData1
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999999',
                type: 'dashed'
              }
            },
            data: data
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999999'
              }
            }
          },
          grid: {
            top: 30,
            left: 40,
            right: 40,
            bottom: '10%' // 也可设置left和right设置距离来控制图表的大小
          }
        }
        myChart.setOption(option)
        myChart.resize()
        window.addEventListener('resize', function() {
          myChart.resize()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
