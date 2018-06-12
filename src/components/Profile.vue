<template lang="pug">
  v-container(fluid)
    app-player-card(v-for="player in favoritedPlayers"
                    :firstName="player.split(' ')[0]"
                    :lastName="player.split(' ')[1]"
                    :key="player").player-card
</template>

<script>
import PlayerCard from './PlayerCard.vue'

export default {
  name: 'app-profile',

  components: {
    'app-player-card': PlayerCard
  },

  data () {
    return {
      favoritedPlayers: [
        'Lebron James',
        'Stephen Curry',
        'John Wall',
        'Lonzo Ball'
      ]
    }
  },

  created () {
    // fetch fav players from firebase
  }
}
</script>
