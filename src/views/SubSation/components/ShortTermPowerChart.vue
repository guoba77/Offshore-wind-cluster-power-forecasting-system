<template>
  <div id="myChart1" :style="{width: '100%', height: '90%'}"></div>
</template>

<script>

export default {
  name: 'ShortTermPowerChart',
  data() {
    return {
      xData: ['2022-04-01', '2022-04-02', '2022-04-03', '2022-04-04', '2022-04-05', '2022-04-06', '2022-04-07', '2022-04-08', '2022-04-09'],
      showChars: ''
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
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(_ => {
        const myChart = this.$echarts.init(document.getElementById('myChart1'))
        // for (let i = 6; i > 0; i--) {
        //   this.xData.push(getNextDate(dd, -i))
        // }
        // for (let i = 0; i < 4; i++) {
        //   this.xData.push(getNextDate(dd, i))
        // }
        // 绘制图表
        const option = {
          // legend: {
          //   data: ['进场'],
          //   textStyle: {
          //     align: 'right'
          //   },
          //   x: 'right',
          //   y: '2%',
          //   icon: 'diamond'
          // },

          tooltip: {
            trigger: 'axis'
          },

          grid: {
            top: '18%',
            left: '8%',
            right: '3%',
            bottom: '10%'
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                show: true
              },
              splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                  color: '#f00'
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                margin: 10
              },
              boundaryGap: false,
              data: this.xData
            }
          ],

          yAxis: [
            {
              type: 'value',
              min: 0,
              // max: 140,
              splitNumber: 4,
              max: '100',
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#e3e3e3'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true,
                margin: 20,
                formatter: '{value} %'
              },
              axisTick: {
                show: false
              },
              label: {
                show: false,
                position: 'top',
                textStyle: {
                  color: '#7AA1FF'
                },
                formatter: '{c} %',
                trigger: 'item'
              }
            }
          ],
          series: [
            {
              // name: '进场',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'circle',
              symbolSize: 12,
              lineStyle: {
                normal: {
                  color: '#7AA1FF'
                }
              },

              itemStyle: {
                color: '#7AA1FF',
                borderWidth: 3,
                borderColor: '#f3f3f3'
              },
              tooltip: {
                formatter: '{a}%'
              },
              data: [75, 82, 92, 83, 60, 86, 90, 100, 92]
            }
          ]
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
