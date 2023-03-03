# CSPG_NEPF-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 访问后端api
* 本项目访问后端api采用axios并且进行了一层封装（详见src/utils/request.js）
* 后端api的基础url配置在config/dev.env.js（开发环境）以及config/prod.env.js（生产环境）中，注意修改后需要重启项目。引用方式是process.env.变量名
* 如无特殊情况，一般需要先定义好后台接口再访问，定义示例参考src/api/chart.js，引用示例参考src/views/home/index.vue中的import { findChartsByPage } from '@/api/chart'

## 自定义组件
自定义组件如果没有特殊情况则统一放在src/components下。
