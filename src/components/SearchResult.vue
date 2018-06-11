<template lang="pug">

</template>

<script>
export default {
  name: 'app-search-result',

  data () {
    return {
      playerProfile: {

      }
    }
  },

  methods: {
    doFavorite () {
      console.log('player favorited')
      // add/remove favorited to firebase
      // update vuex store
    }
  },
}
</script>

<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

.headline, .instructions
  font-family 'Ubuntu', sans-serif

.headline
  font-size 40px
  font-weight bold
</style>
