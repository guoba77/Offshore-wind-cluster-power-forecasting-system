<template>
  <div class="windSpeed">
    <div class="windSel">
      <span>省：</span>
      <el-select v-model="value" size="small" style="width: 150px" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span>市：</span>
      <el-select v-model="value" size="small" style="width: 150px" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span>场站：</span>
      <el-select v-model="value" size="small" style="width: 150px" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span>日期范围：</span>
      <el-date-picker
          v-model="value1"
          size="small"
          type="daterange"
          range-separator="至"
          style="width: 300px"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" size="small">查询</el-button>
      <el-button size="small">重置</el-button>
    </div>
    <div class="windECharts">
      <windEChart></windEChart>
    </div>
  </div>
</template>
<script>
import windEChart from './components/windEChart'
export default {
  name: 'index',
  components: {
    windEChart
  },
  data() {
    return {
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' }
      ],
      value: '',
      value1: ''
    }
  }
}
</script>

<style scoped lang="scss">
.windSpeed{
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 5px #888888;
  .windSel{
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding: 0 15px;
    background-color: skyblue;
    span{
      font-size: 18px;
      font-weight: bold;
      padding-left: 10px;
    }
    select{
      width: 100px;
    }
    button{
      width: 80px;
      font-size: 14px;
      margin-left: 10px
    }
  }
  .windECharts{
    height: calc(100% - 60px);
  }
}
</style>
