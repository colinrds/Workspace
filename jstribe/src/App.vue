<template>
  <div id="app">
    <header>
      <div class="site-header">
        <a href="#" class="logo">jstribe</a>
        <div class="search">
          <input type="text" class="search-text" placeholder="请输入搜索关键字">
          <input type="button" class="search-btn">
        </div>
      </div>
      <div class="nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">JavaScript</a></li>
          <li><a href="#">Vue</a></li>
          <li><a href="#">React</a></li>
          <li><a href="#">Angula</a></li>
        </ul>
      </div>
    </header>
    <main>
      <router-view></router-view>
      <div class="sidebar">
        <div class="my-intro">
          <h3 class="my-name">Colin</h3>
          <p class="my-content">To live is to learn,to learn is to better live.</p>
          <p>
            <a href="#" class="my-rrs"></a>
            <a href="#" class="my-email"></a>
            <a href="#" class="my-github"></a>
          </p>
        </div>
        <div class="sidebar-title"><i>#</i>Popular Tips</div>
        <div class="sidebar-content">
          <ul class="article-list">
            <li><a href="#">如何使用Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定对象和象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定对象和函数</a></li>
            <li><a href="#">如何使用Bind方法绑定Bind方法绑定对象和函数</a></li>
          </ul>
        </div>
        <div class="sidebar-title"><i>#</i>Popular Tags</div>
        <div class="sidebar-content">
          <div class="tag-list">
            <a href="#">JavaScript</a>
            <a href="#">Vue</a>
            <a href="#">继承</a>
            <a href="#">React</a>
            <a href="#">Angula</a>
            <a href="#">设计模式</a>
            <a href="#">开发</a>
            <a href="#">JavaScript</a>
            <a href="#">Vue</a>
            <a href="#">继承</a>
            <a href="#">React</a>
            <a href="#">Angula</a>
            <a href="#">设计模式</a>
            <a href="#">开发</a>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer-center">
        <div class="footer-about">
          Copyright &copy; 2017-2018, JSTRIBE.COM, All Rights Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  @import 'assets/css/main.css';
</style>
