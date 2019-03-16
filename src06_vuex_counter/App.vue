<template>
  <div>
    <p>clicked {{count}} times, count is {{evenOrOdd}}</p>

    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>
<script>

  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {

    /*computed: {
      count () {
        return this.$store.state.count
      },

      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }
    },*/
    computed: {
      ...mapState(['count']), // {count () {return this.$store.state['count']}}
      ...mapGetters(['evenOrOdd']), // {evenOrOdd () {return this.$store.getters['evenOrOdd']}}
    },
    /*methods: {
      increment () {
        console.log('increment()')
        this.$store.dispatch('increment')
      },
      decrement () {
        this.$store.dispatch('decrement')
      },
      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        this.$store.dispatch('incrementAsync')
      },
    }*/
    methods: {
      ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
    }
  }

  /*
  ...的作用?
  1. 打包: 将多个数据收集到一个容器中(数组/对象)
    function fn (...args) {}
    fn(2, 3)
    fn(2, 3, 4)
  2. 解/拆包: 将容器中的多个数据拿出来分别使用
    const arr1 = [1, 3, 5]
    const arr2 = [6, ...arr1]   // [6, 1, 3, 5]

    const p = {name: 'tom', age: 12}
    <Person  {...p} />
   */
</script>
<style scoped>

</style>