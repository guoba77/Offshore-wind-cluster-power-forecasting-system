<template>
  <div id="myChart5" :style="{width: '100%', height: '90%'}"></div>
</template>

<script>
export default {
  name: 'ShortTermPowerChart',
  data() {
    return {
      xData: ['2021-10', '2021-11', '2021-12', '2022-01', '2022-02', '2022-03']
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
        const myChart = this.$echarts.init(document.getElementById('myChart5'))
        // for (let i = 1; i <= 6; i++) {
        //   this.xData.push(i + '月')
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
                  color: '#edb412'
                }
              },

              itemStyle: {
                color: '#edb412',
                borderWidth: 3,
                borderColor: '#edb412'
              },
              tooltip: {
                formatter: '{a}%'
              },
              data: [83, 60, 86, 90, 100, 92]
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
