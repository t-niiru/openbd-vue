<template>
  <div>
    <input type=text v-model="input" placeholder="input isbn-num">
    <button @click="searchOpnedb()">Opnedb Search!!</button>
    <button @click="searchGooglebooks()">Googlebooks Search!!</button>
    <button @click="clear()">clear</button>
    <p>title :{{ outputTitle }}</p>
    <p>author: {{ outputAuthor }}</p>
    <p>img: <img v-bind:src="outputImage"></p>
  </div>
</template>

<script>
import axios from 'axios'

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
    searchOpnedb: function () {
      const URL_BASE = 'https://api.openbd.jp/v1/get?isbn='
      let inputText = this.input && this.input.trim()
      if (!inputText) {
        this.outputTitle = '入力してください!!'
        return
      }
      this.outputTitle = ''
      this.outputAuthor = ''
      this.outputImage = ''
      axios.get(URL_BASE + this.input)
        .then(res => {
          let JsonData = res.data
          console.log(JsonData.totalItems)
          if (JsonData[0] === null) {
            this.outputTitle = '該当データなし!!'
            return
          }
          this.outputTitle = JsonData[0].summary.title
          this.outputAuthor = JsonData[0].summary.author
          this.outputImage = JsonData[0].summary.cover
        })
        .catch(error => {
          throw error
        })
    },
    searchGooglebooks: function () {
      const URL_BASE = 'https://www.googleapis.com/books/v1/volumes?q='
      let inputText = this.input && this.input.trim()
      if (!inputText) {
        this.outputTitle = '入力してください!!'
        return
      }
      this.outputTitle = ''
      this.outputAuthor = ''
      this.outputImage = ''
      axios.get(URL_BASE + this.input)
        .then(res => {
          let JsonData = res.data
          console.log(JsonData.totalItems)
          if (JsonData.totalItems === 0) {
            this.outputTitle = '該当データなし!!'
            return
          }
          this.outputTitle = JsonData.items[0].volumeInfo.title
          this.outputAuthor = JsonData.items[0].volumeInfo.authors
          this.outputImage = JsonData.items[0].volumeInfo.imageLinks.thumbnail
        })
        .catch(error => {
          throw error
        })
    },
    clear: function () {
      this.input = ''
      this.outputTitle = ''
      this.outputAuthor = ''
      this.outputIsbn = ''
      this.outputImage = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
