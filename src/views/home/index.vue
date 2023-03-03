<template>
  <div class="home">
    <el-container class="content">
      <el-header class="header">
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--          <el-breadcrumb-item v-for="(item, index) in this.$route.matched" :key="index">-->
<!--            <span v-if="item.name == '首页'">-->
<!--              <router-link :to="item.path">{{item.name}}</router-link>-->
<!--            </span>-->
<!--            <span v-else>{{item.name}}</span>-->
<!--          </el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <div class="title">海上风电集群功率预测系统</div>
        <div style="display: flex">
          <div :class="active === '/PowerPrediction' ? 'headImgActive' : 'headImg' " @click="onRouter('PowerPrediction' ,1)">功率预测</div>
          <div :class="active === '/ReportingStatus' ? 'headImgActive' : 'headImg' " @click="onRouter('ReportingStatus' ,2)">上报状态</div>
          <div :class="active === '/ReportFile' ? 'headImgActive' : 'headImg' " @click="onRouter('ReportFile', 3)">上报文件</div>
          <div :class="active === '/AssessmentStatistics' ? 'headImgActive' : 'headImg' " @click="onRouter('AssessmentStatistics', 4)">预测评估</div>
          <div :class="active === '/FileTransfer' ? 'headImgActive' : 'headImg' " @click="onRouter('FileTransfer', 5)">场站交互</div>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link" style="color:white;font-size: 16px">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onLogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-main class="con">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { SubSationMenu } from '../../api/api'
import { getToken } from '../../utils/token'
export default {
  name: 'Menu.vue',
  data() {
    return {
      menuList: [],
      activePath: '',
      filterText: '',
      autofocus: false,
      defaultShowNodes: [10],
      label: '',
      active: 1,
      username: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeIndex2: '1'
    }
  },
  created() {
    this.autofocus = true
    this.menuList = this.$router.options.routes[0].children
    this.activePath = this.$router.currentRoute.path
    this.username = getToken('username')
    this.active = this.$router.history.current.path
    this.showTree()
  },
  mounted() {
    this.active = this.$router.history.current.path
    window.addEventListener('resize', () => {
      this.$store.commit('RESIZE', {
        height: window.innerHeight,
        width: window.innerWidth
      })
    })
    window.dispatchEvent(new Event('resize'))
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 左侧树接口
    showTree() {
      SubSationMenu().then((res) => {
        this.treeData = JSON.parse(JSON.stringify(res.data))
        this.treeData.forEach((item) => {
          item.label = item.provinceName
          item.children = item.cityStationResDTOList
          item.hierarchy = 1
          item.cityStationResDTOList.forEach((k) => {
            k.label = k.cityOrStationName
            k.children = k.stationPcResDTOList !== null ? k.stationPcResDTOList : []
            k.disabled = true
            k.hierarchy = 2
            k.children.forEach((n) => {
              n.label = n.stationName
              n.hierarchy = 3
            })
          })
        })
      })
    },
    // 树形控件查询
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    currentChange(event) {
      if (event.hierarchy === 3) {
        this.label = event.label
        // this.$router.push('/home/subSation')
        this.$store.commit('SET_LABEL', event.label)
        this.$store.commit('SET_LIST', event)
        localStorage.setItem('label', event.label)
        localStorage.setItem('stationId', event.stationId)
        localStorage.setItem('stationName', event.stationName)
      }
    },
    // 路由跳转
    onRouter(link, index) {
      this.active = '/' + link
      this.$router.push(link)
    },
    // 退出登录
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: calc(100% - 2px);
    display: flex;
    background-size: 100% 100%;
    //background-image: url("../../assets/img/bg_body.jpg");
    background-image: url("../../assets/img/data08.png");
    .header{
      height: 60px;
      line-height: 60px;
      //border: 1px solid #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      //background-image: url("../../assets/img/bg_box3.png");
      //background-color: white;
      .title{
        font-size: 1.5rem;
        width: 25%;
        font-weight: 600;
        color: white;
        background-image: url("../../assets/img/headbg.png");
        background-size: 100% 100%;
      }
      .headImg{
        background-image: url("../../assets/img/bnt.png");
        margin: 0 10px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        color: white;
        width: 120px;
        background-size: 100% 100%;
      }
      .headImg:hover{
        background-image: url("../../assets/img/bntactive.png");
        cursor: pointer;
      }
      .headImgActive{
        background-image: url("../../assets/img/bntactive.png");
        cursor: pointer;
        margin: 0 10px;
        height: 40px;
        line-height: 40px;
        color: white;
        width: 120px;
        background-size: 100% 100%;
      }
      .a-but{
        width: 10rem;
        font-size: 18px;
        background-color: rgba(0,0,0,0);
      }
    }
    .menu{
      height: 100%;
      .filter-tree{
        height: calc(100% - 50px);
        overflow: auto;
      }
      .el-menu{
        height: 100%;
        text-align: initial;
      }
    }
    .content{
      height: 100%;
    }
    .con{
      padding: 0px;
      width: 100%;
      //background-color: #eeeeee;
      //border: 1px solid #999;
    }
    /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      //background-color: #999;
      //background-image: url("../../assets/img/bg_box3.png");
      color: white;
    }
    /deep/ .el-loading-mask {
      background-color: rgba(48,63,92,0.54);
    }
    /deep/ .el-checkbox__input.is-disabled+span.el-checkbox__label {
      color: #6a6a6a;
    }
    /deep/ .el-table::before{
      background-color: transparent;
    }
  }
</style>
