<template lang="pug">
  #app
    v-app
      app-header
      router-view
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    'app-header': AppHeader
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'
</style>
