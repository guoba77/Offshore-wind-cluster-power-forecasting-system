<template>
  <el-dialog
      :title="title"
      :visible="visible"
      :show-close="false"
      width="770px">
    <el-form :inline="true" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" label-position="right">
      <el-form-item label="场站名称：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="场站类型：" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择场站类型">
          <el-option label="风电场" :value="0"></el-option>
          <!-- <el-option label="光伏电站" :value="1"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="场站识别码：" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="新能源唯一ID：" prop="nedcId">
        <el-input v-model="ruleForm.nedcId"></el-input>
      </el-form-item>
      <el-form-item label="区域类型：" prop="type">
        <el-select v-model="ruleForm.areaType" placeholder="请选择场站类型">
          <el-option label="海上" :value="1"></el-option>
          <el-option label="沿海" :value="2"></el-option>
          <el-option label="陆地" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场站所属分群：" prop="clusterId">
        <el-select v-model="ruleForm.clusterId" filterable placeholder="请选择场站所属分群">
          <el-option :key="i.id" v-for="i in clusterList" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="装机容量(MW)：" prop="capacity">
        <el-input v-model="ruleForm.capacity"></el-input>
      </el-form-item>
      <el-form-item label="场站地址：">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="场站所属省：" prop="provinceId">
        <el-select v-model="ruleForm.provinceId" filterable @change="onCityChange($event,2)" placeholder="请选择场站所属省">
          <el-option :key="i.id" v-for="i in provinceList" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场站所属地级市：" v-if="cityShow === true" prop="cityId">
        <el-select v-model="ruleForm.cityId" filterable placeholder="请选择场站所属地级市">
          <el-option :key="i.id" v-for="i in cityList" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场站所属地级市：" v-else>
        <el-select v-model="ruleForm.cityId" filterable placeholder="请选择场站所属地级市">
          <el-option :key="i.id" v-for="i in cityList" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否重点关注：">
        <el-switch
          v-model="ruleForm.focus"
          active-color="#13ce66"
          inactive-color="#ccc">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="onClose('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { validatNumber } from '@/utils/validate'
import { TableAdd, CityList, TableUpdate } from '../../../../api/api'

export default {
  props: ['visible', 'title', 'provinceList', 'clusterList', 'row'],
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: '',
        code: '',
        nedcId: '',
        name: '',
        type: 0,
        areaType: 1,
        clusterId: '',
        capacity: '',
        address: '',
        provinceId: '',
        cityId: '',
        focus: false
      },
      cityShow: true,
      cityList: [],
      id: '',
      rowList: {},
      rules: {
        code: [
          { required: true, message: '场站识别码不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        nedcId: [
          { required: true, validator: validatNumber, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '场站名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '场站类型不能为空', trigger: 'change' }
        ],
        areaType: [
          { required: true, message: '区域类型不能为空', trigger: 'change' }
        ],
        clusterId: [
          { required: true, message: '场站所属分群不能为空', trigger: 'change' }
        ],
        capacity: [
          { required: true, message: '装机容量不能为空', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '场站所属省不能为空', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '场站所属地级市不能为空', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible(newVal, oldVal) {
      // this.dialogVisible = newVal
      if (newVal) {
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.resetFields()
        }
        if (this.title === '修改场站') {
          this.rowList = JSON.parse(JSON.stringify(this.row))
          this.ruleForm.code = this.rowList.code
          this.ruleForm.nedcId = this.rowList.nedcId
          this.ruleForm.name = this.rowList.name
          this.ruleForm.type = this.rowList.type
          this.ruleForm.areaType = this.rowList.areaType
          this.ruleForm.clusterId = this.rowList.clusterId
          this.ruleForm.capacity = this.rowList.capacity
          this.ruleForm.provinceId = this.rowList.provinceId
          this.ruleForm.cityId = this.rowList.cityId
          this.ruleForm.address = this.rowList.address
          this.ruleForm.id = this.rowList.id
          this.ruleForm.focus = this.rowList.focus
          this.onCityChange(this.ruleForm.provinceId, 1)
        } else {
          this.ruleForm.code = ''
          this.ruleForm.nedcId = ''
          this.ruleForm.name = ''
          this.ruleForm.type = 0
          this.ruleForm.areaType = 1
          this.ruleForm.clusterId = ''
          this.ruleForm.capacity = ''
          this.ruleForm.provinceId = ''
          this.ruleForm.cityId = ''
          this.ruleForm.address = ''
          this.ruleForm.focus = false
        }
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '新增场站') {
            TableAdd(this.ruleForm).then((res) => {
              if (res.code === 0) {
                this.$message.success('新增成功!')
              } else {
                this.$message.error('新增失败!')
              }
              this.ruleForm.code = ''
              this.ruleForm.nedcId = ''
              this.ruleForm.name = ''
              this.ruleForm.type = 0
              this.ruleForm.areaType = 1
              this.ruleForm.clusterId = ''
              this.ruleForm.capacity = ''
              this.ruleForm.provinceId = ''
              this.ruleForm.cityId = ''
              this.ruleForm.address = ''
              this.ruleForm.focus = false
              this.$emit('visibleClose', false)
            })
          } else {
            TableUpdate(this.ruleForm).then((res) => {
              if (res.code === 0) {
                this.$message.success('修改成功!')
              } else {
                this.$message.error('修改失败!')
              }
              this.$emit('visibleClose', false)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onClose(formName) {
      this.$emit('visibleClose', false)
    },
    // 所有市
    onCityChange(e, num) {
      CityList(e).then((res) => {
        if (res.data.length === 0) {
          // this.cityShow = false
          this.cityList = [{
            name: '暂无',
            id: '9999'
          }]
          this.ruleForm.cityId = '9999'
        } else {
          if (this.title === '修改场站') {
            if (num === 2) {
              this.ruleForm.cityId = ''
            }
          }
          this.cityShow = true
          this.cityList = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-select {
  display: inline-block;
  position: relative;
}
/deep/ .el-input, .el-select {
  width: 200px !important;
}
/deep/ .el-form{
  text-align: left;
}
/deep/ .el-dialog__body{
  padding-bottom: 0;
}
/deep/ .el-dialog__footer{
  padding-right: 37px;
}
</style>
