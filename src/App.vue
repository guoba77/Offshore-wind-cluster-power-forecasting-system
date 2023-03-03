<template>
  <div id="app" @contextmenu.prevent>
    <router-view/>
  </div>
</template>

<script>
// const URL = require('url')
// const urlInfo = URL.parse(window.location.href, true)
// document.title = document.title + '-' + urlInfo.hostname
export default {
  name: 'App'
}
</script>

<style>
@import "../static/css/font-awesome.min.css";
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
::-webkit-scrollbar{ /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb{ /*滚动条里面小方块*/
  border-radius: 5px;
  background: #7b7b7b;
}
::-webkit-scrollbar-track{ /*滚动条里面轨道*/
  border-radius: 5px;
  background-color: rgba(0,0,0,0.1) !important;
}
</style>
