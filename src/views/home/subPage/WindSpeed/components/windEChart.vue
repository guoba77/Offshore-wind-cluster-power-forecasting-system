<template>
  <div id="windEChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
  name: 'windEChart',
  data() {
    return {
      xData: [],
      yData1: [],
      yData2: [],
      yData3: [],
      myChart: {},
      option: {
        grid: {
          left: '30px',
          right: '45px',
          top: '10%',
          bottom: '10px',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          textStyle: {
            align: 'left'
          }
        },
        legend: {
          show: true,
          // top: '5px',
          // right: '140px',
          textStyle: {
            color: '#fff'
          },
          data: []
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#fff',
            fontSize: 16,
            margin: 20
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#44566b'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.25)'
            }
          },
          data: []
        }],
        yAxis: [
          {
            type: 'value',
            name: '万千瓦',
            nameTextStyle: {
              color: 'white',
              fontSize: 16
            },
            min: 0,
            max: 1000,
            // interval: 200,
            splitNumber: 5,
            axisLabel: {
              formatter: '{value}',
              margin: 20,
              fontSize: 16,
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#999',
                type: 'dashed'
              }
            }
          },
          {
            type: 'value',
            name: '米/秒',
            nameTextStyle: {
              color: 'white',
              fontSize: 16
            },
            min: 0,
            max: 10,
            // interval: 2,
            splitNumber: 5,
            axisLabel: {
              formatter: '{value}',
              margin: 20,
              color: '#fff',
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#999',
                type: 'dashed'
              }
            }
          }
        ],
        series: []
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('windEChart'))
        this.myChart.setOption(this.option)
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      })
    },
    refreshCurve(startDay, endDay, data) {
      const option = JSON.parse(JSON.stringify(this.option))
      option.legend.data = data.titleList
      option.xAxis[0].data = data.timeList
      option.series = []

      let maxPower = 0
      let maxSpeed = 0
      data.list.forEach(item => {
        const serie = {
          name: item.title,
          smooth: true,
          type: 'line',
          symbolSize: 6,
          markPoint: {
            data: [
              {
                type: 'max',
                name: '最大值'
              }
            ],
            label: {
              position: 'insideTop',
              distance: 10
            }
          },
          itemStyle: {
            borderWidth: 2,
            // color: 'orange',
            normal: {
            }
          },
          lineStyle: {
            // color: 'orange',
            width: 2
          },
          data: item.dataList,
          connectNulls: true
        }
        if (item.type === 1) { // 风速曲线
          serie.yAxisIndex = 1
          serie.symbol = 'circle'
          item.dataList.forEach(value => {
            if (value && value > maxSpeed) {
              maxSpeed = value
            }
          })
        } else if (item.type === 2) { // 出力曲线
          serie.yAxisIndex = 0
          serie.symbol = 'rect'
          item.dataList.forEach(value => {
            if (value && value > maxPower) {
              maxPower = value
            }
          })
        }
        if (item.color) { // 设置了颜色
          serie.itemStyle.normal.color = item.color
        }
        option.series.push(serie)
      })
      if (maxPower) {
        option.yAxis[0].max = null
      }
      if (maxSpeed) {
        option.yAxis[1].max = null
      }
      if (startDay && endDay) {
        if (startDay === endDay) {
          option.xAxis[0].axisLabel.interval = 3
        }
      //   console.log(4 * ((Date.parse(endDay) - Date.parse(startDay)) / (1000 * 3600 * 24) + 1) - 1)
      //   option.xAxis[0].axisLabel.interval = 4 * ((Date.parse(endDay) - Date.parse(startDay)) / (1000 * 3600 * 24) + 1) - 1
      }
      this.myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>

</style>
