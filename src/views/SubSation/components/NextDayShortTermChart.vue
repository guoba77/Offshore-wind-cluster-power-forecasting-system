<template>
  <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
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
      yData3: []
    }
  },
  computed: {
    monitor() {
      return this.$store.state.tree.showChars
    }
  },
  watch: {
    monitor() {
      return (this.drawLine())
    },
    num: {
      handler: function(val) {
        this.xData = []
        this.yData1 = []
        this.yData2 = []
        this.yData3 = []
        const day = getMonthLength(this.month + '-1')
        for (let i = 1; i <= day; i++) {
          const month = moment(this.month).format('MM')
          if (i < 9 && i > 0) {
            i = '0' + i
          }
          this.xData.push(month + '-' + i)
        }
        this.dataList.forEach((item) => {
          this.yData1.push(item.qualifyCount)
          this.yData2.push(item.unQualifyCount)
          const n = 100 * item.qualifyCount / (item.qualifyCount + item.unQualifyCount)
          this.yData3.push(n.toFixed(2))
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
        const myChart = this.$echarts.init(document.getElementById('myChart2'))
        var data = this.xData
        // 绘制图表
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['合格数', '不合格数', '合格率']
          }, // 图例与series数据相对应，几种数据并列或者堆叠
          grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '10%'
          }, // 图表的位置
          xAxis: {
            type: 'category', // 轴类型  category数据类型轴  value数据值轴  横向柱图就相互交换xy轴type和对应数据
            data: data // 数据类型轴数组
          },
          yAxis: [
            {
              type: 'value', // 数据值轴数组
              min: 0,
              max: 100,
              axisLine: {
                show: true, // 坐标轴线显示与否
                lineStyle: {
                  color: '#828282',
                  width: 1 // 轴线宽
                }
              }, // x轴线段样式
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: 'black'
                },
                formatter: '{value} 个'
              }, // 轴文本样式
              axisTick: {
                show: false
              } // 刻度线样式
            },
            {
              type: 'value',
              min: 0,
              max: 100,
              interval: 20,
              axisLabel: {
                formatter: '{value} °%'
              }
            }
          ],
          series: [
            {
              name: '合格数',
              type: 'bar',
              color: '#8cf55a',
              stack: '叠加',
              data: this.yData1
            },
            {
              name: '不合格数',
              color: '#F56C6C',
              stack: '叠加',
              type: 'bar', // 换为line 实现折线与柱状图
              data: this.yData2
            },
            {
              name: '合格率',
              stack: '我不叠加', // 添加stack属性，相同的stack值的数据类型将会叠加不并列，值为自定义值
              type: 'line', // 换为line 实现折线与柱状图
              data: this.yData3
            }
          ] // 数据类型，一个对象代表一个图表形状，可以切换type换成折线图
        }
        myChart.setOption(option)
        myChart.resize()
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
