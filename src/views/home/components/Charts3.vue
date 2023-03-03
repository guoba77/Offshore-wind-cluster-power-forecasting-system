<template>
  <div id="myChartsQS" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
  name: 'Charts1',
  props: {
    LastMonthData: Array
  },
  data() {
    return {
      myChart: {},
      data: [],
      nameData: []
    }
  },
  watch: {
    LastMonthData(newVal, oldVal) {
      newVal.forEach((item) => {
        this.nameData.push(item.stationName)
        this.data.push(item.avgAcc)
      })
      this.drawLine()
    }
  },
  methods: {
    drawLine() {
      this.$nextTick(_ => {
        const myChart = this.$echarts.init(document.getElementById('myChartsQS'))
        var XData = this.nameData
        var valueData = {
          sydw: this.data
        }
        // 绘制图表
        const option = {
          title: {
            text: '上月短期预测准确率排名TOP10',
            textStyle: { fontSize: 22, fontWeight: 800 },
            padding: [5, 0, 0, 0]
          },
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '0%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: XData,
            axisLine: {
              lineStyle: {
                color: '#cdd5e2'
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 20,
              textStyle: {
                color: '#666666'
              }
            }
          },
          yAxis: [{
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#666666'
              }},
            axisLine: {
              lineStyle: {
                color: '#cdd5e2'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(193, 207, 220, 1)'
              }
            }
          }
          ],
          series: [{
            name: '准确率',
            type: 'bar',
            barWidth: '12px',
            itemStyle: {
              normal: {
                color: 'rgb(31,145,221)',
                barBorderRadius: 6
              }
            },
            data: valueData.sydw
          }]
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
