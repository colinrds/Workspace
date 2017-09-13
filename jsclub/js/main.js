(function (window) {
    // 左侧菜单跟随滚动
    window.onscroll = function () {
        var sTop = document.documentElement.scrollTop || document.body.scrollTop;
        var $navList = document.getElementsByClassName('nav-list')[0];
        if (sTop < 70) {
            $navList.style.position = '';
        }
        if (sTop > 70) {
            $navList.style.position = 'fixed';
        }
    }

})(window)

var home = Vue.extend({
    template: '<div class="list">'+
            '<div class="list-li" v-for="list in lists">'+
            '<h3 class="list-title"><a :href="list.href">{{list.title}}</a></h3>'+
            '<p class="list-info">{{list.date}}</p>'+
            '<div class="list-img"><ul>'+
            '<li v-for="listImage in list.image"><span><img :src="listImage"></span></li>'+
            '</ul></div>'+
            '<p class="list-intro">{{list.intro}}</p>'+
            '<span class="visit">{{list.visit}}</span>'+
            '</div></div>',
    data: function () {
        return {
            lists:[
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
            ]
        }
    }
});

var javascript = Vue.extend({
    template: '<div class="list">'+
            '<div class="list-li" v-for="list in lists">'+
            '<h3 class="list-title"><a :href="list.href">{{list.title}}</a></h3>'+
            '<p class="list-info">{{list.date}}</p>'+
            '<div class="list-img"><ul>'+
            '<li v-for="listImage in list.image"><span><img :src="listImage"></span></li>'+
            '</ul></div>'+
            '<p class="list-intro">{{list.intro}}</p>'+
            '<span class="visit">{{list.visit}}</span>'+
            '</div></div>',
    data: function () {
        return {
            lists:[
                {
                    title: '函数式编程术语解析',
                    href: '#',
                    date: '2017-08-11',
                    visit: '55',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: 'npm的安装配置和React开发环境配置',
                    href: '#',
                    date: '2017-08-11',
                    visit: '66',
                    image: null,
                    intro: '工欲善其事，必先利其器。在正式学习 React 技术栈之前，我们先来介绍一下之后经常要使用到的 npm。npm 是一个基于 Nodejs 的 JavaScript 包管理工具，全称叫做 Node Package Manager，所谓的包呢，其实就是可复用的代码，每个人都可以把自己编写的代码库发布到 npm 的源（英文叫做 registry）上面进行管理，你也可以下载别人开发好的包，在你自己的应用当中使用。著作权归作者所有。'
                },
                {
                    title: '如何遍历JavaScript中对象属性',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '近两年前端技术的发展如火如荼，大量的前端项目都在使用或转向 Vue 和 React 的阵营，由前端渲染页面的单页应用占比也越来越高，这就代表前端工作的复杂度也在直线上升，前端页面上展示的信息越来越多也越来越复杂。我们知道，任何状态都需要进行管理，那么今天我们来聊聊前端状态管理。著作权归作者所有。'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '11',
                    image: [
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                        'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                    ],
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
                {
                    title: '使用UML并结合MVC新方法设计精品课程网站',
                    href: '#',
                    date: '2017-08-11',
                    visit: '22',
                    image: null,
                    intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
                },
            ]
        }
    },
    created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function() {
            console.log(111);
        }
    }
});


var router = new VueRouter({
    transitionOnLoad: true,
    routes: [
        { path: '/', component: home },
        { path: '/javascript', component: javascript }
    ]
})


var app = new Vue({
    el: '#app',
    router,
    data: {
        navs: [
            {
                title: 'Home',
                href: '#',
                hover: true
            },
            {
                title: 'JavaScript',
                href: '#javascript',
                hover: false
            },
            {
                title: 'NodeJS',
                href: '#nodejs',
                hover: false
            },
            {
                title: 'Vue',
                href: '#vue',
                hover: false
            },
            {
                title: 'React',
                href: '#react',
                hover: false
            }
        ],
        hotList: [
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#'
            },
            {
                title: 'UML与MVC设计模式在MIS中的研究与应用',
                href: '#'
            },
            {
                title: 'MIS中的研究与应用',
                href: '#'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#'
            },
            {
                title: 'UML与MVC设计模式在MIS中的研究与应用',
                href: '#'
            },
            {
                title: 'MIS中的研究与应用',
                href: '#'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#'
            },
            {
                title: 'UML与MVC设计模式在MIS中的研究与应用',
                href: '#'
            },
            {
                title: 'MIS中的研究与应用',
                href: '#'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#'
            }
        ],
        lists:[
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '131',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: null,
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '331',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '641',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: null,
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: null,
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            },
            {
                title: '使用UML并结合MVC新方法设计精品课程网站',
                href: '#',
                date: '2017-08-11',
                visit: '231',
                image: [
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6',
                    'http://addon.discuz.com/resource/preview/28883/2.thumb.jpg?v2Lj6'
                ],
                intro: '使用UML并结合MVC新方法设计精品课程网站.用UML用例图做需求分析,用UML类图进行系统静态设计,用UML顺序图进行系统动态设计.用MVC组件图设计系统总架构.通过PHP语言实现'
            }
        ]
    },
    methods: {
        navClick: function (idx, event) {
            this.navs.forEach(function (val, index) {
                if (index == idx) {
                    val.hover = true;
                } else {
                    val.hover = false;
                }
            })
        }
    }
})
