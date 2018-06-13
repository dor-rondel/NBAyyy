<template lang="pug">
  v-container(fluid)
    h2(v-if="emptyCheck" style="color: #ef5350; text-align: center")
      | You Have No Favorited Players
    app-player-card(v-for="player in favoritedPlayers"
                    :firstName="player.split(' ')[0]"
                    :lastName="player.split(' ')[1]"
                    :key="player").player-card
</template>

<script>
import * as firebase from 'firebase'
import PlayerCard from './PlayerCard.vue'

export default {
  name: 'app-profile',

  components: {
    'app-player-card': PlayerCard
  },

  computed: {
    favoritedPlayers () {
      return this.$store.getters.getFavoritedPlayersArray
    },

    emptyCheck () {
      return this.favoritedPlayers.length === 0
    }
  },

  created () {
    firebase.firestore().collection('users').onSnapshot(snapshot => {
      const favArr = snapshot.docs
        .find(doc => doc.id === this.$store.getters.getUID)
        .data()
        .favorites
      this.$store.dispatch('setFavoriteArrayAct', favArr)
    })
  }
}
</script>
