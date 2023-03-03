<template>
  <div class="edit-subSation" v-loading="loading" element-loading-text="Loading..." style="border-radius: 4px;">
    <div class="edit-header">
      <el-button @click="onAdd" size="small" type="primary">新 增</el-button>
      <div>
        <el-input v-model="name" size="small" style="width: 150px" placeholder="场站名称" clearable></el-input>
        <el-input v-model="input" size="small" style="width: 135px" placeholder="场站识别码" clearable></el-input>
        <el-input v-model="nedcId" size="small" style="width: 135px" placeholder="新能源唯一ID" clearable></el-input>
        <el-select v-model="focus" size="small" placeholder="重点关注状态" clearable style="width: 150px">
          <el-option key="2" label="重点关注" :value="1"></el-option>
          <el-option key="1" label="非重点关注" :value="0"></el-option>
        </el-select>
        <el-select v-model="subType" size="small" placeholder="场站类型" clearable style="width: 150px">
          <el-option key="1" label="风电场" :value="0"></el-option>
          <el-option key="2" label="光伏电场" :value="1"></el-option>
        </el-select>
        <el-select v-model="subProvince" size="small" filterable @change="onCityChange" placeholder="场站所属省" clearable style="width: 155px">
          <el-option :key="i.id" v-for="i in provinceList" :label="i.name" :value="i.id"></el-option>
        </el-select>
        <el-select v-model="subCity" size="small" placeholder="场站所属地级市" clearable style="width: 150px">
          <el-option :key="i.id" v-for="i in cityList" :label="i.name" :value="i.id"></el-option>
        </el-select>
        <el-button @click="onQuery" size="small" type="primary" style="vertical-align: top;">查询</el-button>
        <!-- <el-button @click="onReset" size="small">重置</el-button> -->
      </div>
    </div>
    <el-table ref="table" :data="tableData" border size="small" style="width: 100%;padding: 10px">
      <el-table-column prop="name" label="场站名称" width="120"></el-table-column>
      <el-table-column prop="code" label="场站识别码" width="100"></el-table-column>
      <el-table-column prop="type" label="场站类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">风电场</span>
          <span v-else-if="scope.row.type === 1">光伏电站</span>
        </template>
      </el-table-column>
      <el-table-column prop="capacity" label="装机容量（MW）" width="130"></el-table-column>
      <el-table-column prop="nedcId" label="新能源唯一ID" width="100"></el-table-column>
      <el-table-column label="重点关注" width="70">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.focus"
            @change="toggleFocus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="provinceName" label="场站所属省、自治区、直辖市"></el-table-column>
      <el-table-column prop="cityName" label="场站所属地级市、地区、自治州、盟"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              @confirm="subStationDel(scope.row)"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除此场站吗？"
          >
            <el-button slot="reference" type="danger" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        :page-size="pageSize"
        :current-page="currPage"
        layout="prev, pager, next"
        style="padding-top: 5px"
        @current-change="currentChange"
        :total="total">
    </el-pagination>
    <SubSationAdd :visible="visible" :title="title" :provinceList="provinceList" :clusterList="clusterList" :row="row" @visibleClose="visibleClose"></SubSationAdd>
  </div>
</template>

<script>
import SubSationAdd from './components/SubSationAdd'
import { TableList, TableDel, ProvinceList, CityList, ClusterList, SwitchFocus } from '../../../api/api'
export default {
  name: 'index',
  components: {
    SubSationAdd
  },
  data() {
    return {
      loading: false,
      tableData: [],
      visible: false,
      provinceList: [],
      cityList: [],
      clusterList: [],
      row: {},
      title: '',
      input: '',
      nedcId: '',
      name: '',
      subType: null,
      subProvince: '',
      subCity: '',
      focus: null,
      value: '',
      total: 0,
      pageSize: 10,
      currPage: 1
    }
  },
  watch: {
    '$route.fullPath': {
      handler: function(newV, oldV) {
        const table = this.$refs['table']
        if (table) {
          table.doLayout()
        }
      }
    }
  },
  mounted() {
    this.showProvince()
    this.showCluster()
    this.showList()
  },
  methods: {
    showList(input, nedcId, name, subType, subProvince, subCity, focus) {
      this.loading = true
      TableList({
        page: this.currPage,
        limit: this.pageSize,
        code: input,
        nedcId: nedcId,
        type: subType,
        name: name,
        provinceId: subProvince,
        cityId: subCity,
        focus: focus
      }).then((res) => {
        this.total = res.data.total
        this.pageSize = res.data.pageSize
        this.tableData = res.data.list
        this.loading = false
      }).catch(s_err => {
        this.loading = false
      })
    },
    // 所有省
    showProvince() {
      ProvinceList().then((res) => {
        this.provinceList = res.data
      })
    },
    // 所有分群
    showCluster() {
      ClusterList().then((res) => {
        this.clusterList = res.data
      })
    },
    // 所有市
    onCityChange(e) {
      this.subCity = ''
      if (this.subProvince) {
        CityList(e).then((res) => {
          this.cityList = res.data
        })
      } else {
        this.cityList = []
      }
    },
    // 分页
    currentChange(val) {
      this.currPage = val
      this.showList()
    },
    // 新增
    onAdd() {
      this.visible = true
      this.title = '新增场站'
    },
    // 删除
    subStationDel(row) {
      TableDel(row.id).then((res) => {
        if (res.code === 0) {
          this.$message.success('删除成功!')
          this.showList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 修改
    handleClick(row) {
      this.row = row
      this.visible = true
      this.title = '修改场站'
    },
    // 查询
    onQuery() {
      this.currPage = 1
      this.showList(this.input, this.nedcId, this.name, this.subType, this.subProvince, this.subCity, this.focus)
    },
    // 重置
    onReset() {
      this.input = ''
      this.name = ''
      this.subType = ''
      this.subProvince = ''
      this.subCity = ''
      this.showList()
    },
    visibleClose() {
      this.visible = false
      // this.pageSize = 10
      // this.currPage = 1
      this.showList()
    },
    toggleFocus(row) {
      const id = row.id
      const newStatus = row.focus
      SwitchFocus(id, newStatus).then(res => {
      }).catch(s_err => {
        row.focus = !newStatus
      })
    }
  }
}
</script>

<style scoped lang="scss">
.edit-subSation{
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  background-color: white;
  .edit-header{
    display: flex;
    padding: 0 20px 20px 20px;
    padding-left: 0;
    justify-content: space-between;
  }
}
</style>
