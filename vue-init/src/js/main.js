import '../css/main.scss';
import Vue from 'vue';
import app from '../components/app.vue';
Vue.config.debug = true;

new Vue(app);

class StdInfo {
    constructor(){
       this.name = "job";            
       this.age = 30;      
    }
    //定义在类中的方法不需要添加function
    getNames(){
       console.log("name："+this.name);      
    }
}
//使用new的方式得到一个实例对象
var p = new StdInfo();