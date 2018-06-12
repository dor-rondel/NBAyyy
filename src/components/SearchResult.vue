<template lang="pug">
  app-player-card(:firstName="firstName" :lastName="lastName")
</template>

<script>
import PlayerCard from './PlayerCard.vue'

export default {
  name: 'app-search-result',

  components: {
    'app-player-card': PlayerCard
  },

  props: {
    lastName: {
      required: true,
      type: String
    },
    firstName: {
      required: true,
      type: String
    }
  }
}
</script>
