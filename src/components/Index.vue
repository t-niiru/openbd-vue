<template>
  <div>
    <input type=text v-model="input" placeholder="input isbn-num">
    <button @click="search()">Search!!</button>
    <p>title :{{ outputTitle }}</p>
    <p>author: {{ outputAuthor }}</p>
    <p>isbn: {{ outputIsbn }}</p>
    <p>img: <img v-bind:src="outputImage"></p>
  </div>
</template>

<script>
import axios from 'axios'

const URL_BASE = 'https://api.openbd.jp/v1/get?isbn='

export default {
  name: 'Index',
  data () {
    return {
      input: '',
      outputTitle: '',
      outputAuthor: '',
      outputIsbn: '',
      outputImage: ''
    }
  },
  methods: {
    search: function () {
      let inputText = this.input && this.input.trim()
      if (!inputText) {
        console.log('未入力!!')
        return
      }
      axios.get(URL_BASE + this.input)
        .then(res => {
          let JsonData = res.data
          this.outputTitle = JsonData[0].summary.title
          this.outputAuthor = JsonData[0].summary.author
          this.outputIsbn = JsonData[0].summary.isbn
          this.outputImage = JsonData[0].summary.cover
        })
        .catch(error => {
          throw error
        })
    },
    add: function () {
      console.log('クリック!!')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
