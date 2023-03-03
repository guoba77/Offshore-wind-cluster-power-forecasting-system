<template>
  <div id="myChartsDay" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
  name: 'Charts1',
  props: {
    shortTime: Object
  },
  data() {
    return {
      value: '',
      yData1: [{ value: 100, itemStyle: { color: 'red' }}, 200, 300, 124, 535, 636, 437],
      yData2: [300, 300, 390, 224, 435, 236, 737],
      yData3: [200, 400, 300, 624, 735, 136, 347],
      xList: [1, 2, 3, 4, 5, 6],
      myChart: {},
      option: {
        grid: {
          top: 60,
          left: 50,
          right: 50,
          bottom: '35' // 也可设置left和right设置距离来控制图表的大小
        },
        series: [
          {
            type: 'line',
            name: '实际',
            smooth: true,
            symbolSize: 6,
            symbol: 'rect',
            lineStyle: { color: '#73c0de' },
            connectNulls: true,
            data: []
          },
          {
            type: 'line',
            name: '短期预测',
            smooth: true,
            symbolSize: 6,
            symbol: 'rect',
            lineStyle: { color: '#3ba272' },
            connectNulls: true,
            data: []
          },
          {
            type: 'line',
            name: '超短期预测',
            smooth: true,
            symbolSize: 6,
            symbol: 'rect',
            lineStyle: { color: '#fc8452' },
            connectNulls: true,
            data: []
          },
          {
            type: 'line',
            name: '短期预测(方天)',
            smooth: true,
            symbolSize: 6,
            symbol: 'rect',
            lineStyle: { color: '#9a60b4' },
            connectNulls: true,
            data: []
          }
        ],
        legend: {
          // right: 20,
          //  bottom: '4%',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: '13'
          },
          itemGap: 20,
          itemWidth: 10,
          itemHeight: 10,
          icon: 'rect',
          data: [
            { name: '实际', itemStyle: { color: '#73c0de' }},
            { name: '短期预测', itemStyle: { color: '#3ba272' }},
            { name: '超短期预测', itemStyle: { color: '#fc8452' }},
            { name: '短期预测(方天)', itemStyle: { color: '#9a60b4' }}
          ]
          // data: ['实际功率', '短期预测功率', '超短期预测功率']
        },
        tooltip: {
          trigger: 'axis',
          textStyle: {
            align: 'left'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#44566b'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 13,
            interval: 3,
            rotate: 40
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: 'MW',
          min: 0,
          max: 500,
          splitNumber: 5,
          nameTextStyle: {
            fontSize: 13
          },
          axisLabel: {
            show: true,
            margin: 10,
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          }
        }
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('myChartsDay'))
        this.myChart.setOption(this.option)
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      })
    },
    clearCurve() {
      const option = JSON.parse(JSON.stringify(this.option))
      this.myChart.setOption(option, true)
    },
    refreshCurve(timeList, aList, sList, usList, shortFt) {
      const option = JSON.parse(JSON.stringify(this.option))
      let max = 0

      aList.forEach(item => {
        if (item && item > max) {
          max = item
        }
      })

      sList.forEach(item => {
        const p = item.p
        const q = item.q
        const d = { value: p, itemStyle: { color: 'gray' }}

        if (q === true) {
          d.itemStyle.color = 'green'
        } else if (q === false) {
          d.itemStyle.color = 'red'
        }
        option.series[1].data.push(d)

        if (p && p > max) {
          max = p
        }
      })
      shortFt.forEach(item => {
        const p = item.p
        const q = item.q
        const d = { value: p, itemStyle: { color: 'gray' }}

        if (q === true) {
          d.itemStyle.color = 'green'
        } else if (q === false) {
          d.itemStyle.color = 'red'
        }
        option.series[3].data.push(d)
        if (p && p > max) {
          max = p
        }
      })
      usList.forEach(item => {
        const p = item.p
        const q = item.q
        const d = { value: p, itemStyle: { color: 'gray' }}

        if (q === true) {
          d.itemStyle.color = 'green'
        } else if (q === false) {
          d.itemStyle.color = 'red'
        }
        option.series[2].data.push(d)
        if (p && p > max) {
          max = p
        }
      })
      option.series[0].data = aList
      option.xAxis.data = timeList
      if (max) {
        option.yAxis.max = null
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>

</style>
