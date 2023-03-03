import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/Login',
    component: () => import('../components/Login')
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('../views/home/index'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '总站',
        redirect: '/PowerPrediction',
        component: () => import('../views/home/home')
      },
      {
        path: '/PowerPrediction',
        name: '功率预测',
        component: () => import('../views/home/subPage/PowerPrediction')
      },
      {
        path: '/ReportingStatus',
        name: '上报状态',
        component: () => import('../views/home/subPage/ReportingStatus')
      },
      {
        path: '/ReportFile',
        name: '上报文件',
        component: () => import('../views/home/subPage/ReportFile')
      },
      {
        path: '/WindSpeed',
        name: '多源风速',
        component: () => import('../views/home/subPage/WindSpeed')
      },
      {
        path: '/AssessmentStatistics',
        name: '预测评估',
        component: () => import('../views/home/subPage/AssessmentStatistics')
      },
      {
        path: '/FileTransfer',
        name: '场站交互',
        component: () => import('../views/home/subPage/FileTransfer')
      }
    ]
  },
  {
    path: '/manage',
    component: () => import('../views/admin/index'),
    redirect: '/manage',
    children: [
      {
        path: '/manage',
        name: '场站管理',
        component: () => import('../views/admin/EditSubSation/index'),
        hidden: true
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    component: () => import('../components/404'),
    hidden: true
  }
]

const router = new Router({
  mode: 'history',
  base: '/nepf',
  // mode: 'hash',
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  next()
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  if (to.path === '/Login') { // 不需要验证的路由，直接放行
    next()
  } else { // 需要验证
    if (localStorage.getItem('token')) { // 如果已登录则放行，进入路由
      next()
    } else { // 未登录则跳转到login
      next({
        path: '/Login'
      })
    }
  }
})

export default router

