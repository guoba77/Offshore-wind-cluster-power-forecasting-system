<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>海上风电集群功率预测系统</span>
      </div>
      <el-form :rules="rules" :model="from" ref="from" label-width="60px" class="demo-ruleForm">
        <el-form-item
            label="用户名"
            prop="username">
          <el-input type="text" v-model.number="from.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password">
          <el-input type="password" v-model.number="from.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('from')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { nameRuler, passRuler } from '../utils/ruler'
import { Login } from '../api/api'
import { setToken } from '../utils/token'
export default {
  data() {
    return {
      from: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: nameRuler }],
        password: [{ validator: passRuler }]
      }
    }
  },
  created() {
    var _self = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key === 13 || key === 100) {
        console.log(_self)
        _self.login('from')
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login(this.from).then(res => {
            if (res.code === 0) {
              // this.$message.success('登录成功')
              setToken('token', res.token)
              setToken('username', this.from.username)
              this.$router.push('/home')
            }
          }).catch((err) => {
            return err
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login{
  width: 100%;
  height: 100%;
  position: absolute;
background-image: url("../assets//img//data08.png");
  .box-card{
    width: 450px;
    margin: 200px auto;
    .el-card__header{
      font-size: 34px;
    }
    .el-button{
      width: 100%;
    }
  }
}
</style>
