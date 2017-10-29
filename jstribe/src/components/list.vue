<template>
  <div class="list">
    <div class="list-li" v-for="item in listData">
      <div class="list-top">
        <div class="list-source">来自{{item.source}}分类</div>
        <div class="list-info">
          <span class="list-info-time">{{item.time}}</span>
          <span class="list-info-visit">{{item.visit}}次访问</span>
        </div>
      </div>
      <div class="list-content">
        <h2 class="list-title"><a href="#">{{item.title}}</a></h2>
        <p>{{item.content}}</p>
      </div>
      <div class="list-user">
        <img :src="item.image">{{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      listData: [
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'Vue',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'React',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        },
        {
          id: '123422',
          title: '理解在JavaScript中如何使用Bind方法绑定对象和函数',
          source: 'JavaScript',
          time: '2017-02-11',
          content: '我们常常需要将一个对象绑定到一个方法的 this 上。在 JS 中，如果你想要调用一个函数并指定它的 this 时可以使用 bind 方法。',
          image: 'https://www.loobo.me/wp-content/uploads/avatar/avatar-1.jpg',
          name: 'Colin',
          visit: '1032'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
