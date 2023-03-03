<template>
  <div id="myChartsZZT" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
  name: 'Charts1',
  data() {
    return {
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      this.$nextTick(_ => {
        const myChart = this.$echarts.init(document.getElementById('myChartsZZT'))
        const labelOption = {
          show: true,
          position: 'insideBottom',
          distance: 19,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c} 个  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {}
          }
        }
        // 绘制图表
        const option = {
          title: {
            text: '当天区域准确率对比图',
            textStyle: { fontSize: 18, fontWeight: 'normal' },
            padding: [5, 0, 0, 0]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['90%以下', '90%-95%', '95%以上']
          },
          grid: {
            left: '0%',
            right: '0%',
            top: '10%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '90%以下',
              type: 'bar',
              barGap: 0,
              barWidth: 40,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [10, 2, 11, 4, 9, 4]
            },
            {
              name: '90%-95%',
              type: 'bar',
              barWidth: 40,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [5, 10, 6, 8, 0, 6]
            },
            {
              name: '95%以上',
              type: 'bar',
              barWidth: 40,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [30, 22, 26, 25, 29, 28]
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
