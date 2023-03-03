<template>
  <div class="home">
    <el-aside class="menu" width="200px">
      <el-menu
          router
          :default-active="activePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item v-for="item in menuList" :index="item.path" :key="item.path">
            <i class="el-icon-setting"></i>
            {{ item.name }}
          </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header class="header">
        <div>新能源功率预测场站管理</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onLogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="con">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getToken } from '../../utils/token'

export default {
  name: 'Menu.vue',
  data() {
    return {
      menuList: [],
      activePath: '',
      filterText: '',
      label: '',
      username: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.menuList = this.$router.options.routes[2].children
    this.activePath = this.$router.currentRoute.path
    this.username = getToken('username')
  },
  methods: {
    onLogOut() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear()
        this.$router.push('/Login')
      }).catch(() => {
      })
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;

  .menu {
    height: 100%;

    .filter-tree {
      height: calc(100% - 50px);
    }

    .el-menu {
      height: 100%;
      text-align: initial;
    }
  }

  .content {
    height: 100%;
  }

  .header {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }

  .con {
    padding: 10px;
    width: 100%;
    background-color: #eeeeee;
  }
}
</style>
