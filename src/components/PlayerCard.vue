<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12 sm6 offset-sm3)
        v-card
          v-icon(v-if="userLoggedIn" @click="toggleFavorite").heart {{ heartStatus }}
          v-card-media(:src="playerImg" height="300px" contain)
          v-container(fluid)
            v-layout(row)
              v-flex(xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3)
                v-layout(row wrap)
                  v-flex(xs12 v-for="figure in outputtableData" :key="figure.stat")
                    .statistics
                      span.statName {{ figure.stat }}:
                      span.statValue {{ figure.value }}
                      br
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app-search-result',

  props: {
    lastName: {
      required: true,
      type: String
    },
    firstName: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      playerProfile: {},
      playerImg: `https://nba-players.herokuapp.com/players/${this.lastName}/${this.firstName}`,
      heartStatus: 'far fa-heart'
    }
  },

  methods: {
    /**
     *  Returns transformed key to be shown by page
     *
     *  @param {String} str underscore delimited key from API
     *  @return {String} Capital case version of the entry
     */
    transformKey (str) {
      return str.split('_').map(word => {
        word = word.toLowerCase()
        return word[0].toUpperCase() + word.substr(1, word.length - 1)
      }).join(' ')
    },

    /** toggles player favorite status on page, store, and firebase */
    toggleFavorite () {
      const pname = this.firstName + ' ' + this.lastName
      if (this.playerIsFavorite(pname)) {
        this.unheartPlayer(pname)
      } else {
        this.heartPlayer(pname)
      }
    },

    heartPlayer (pname) {
      this.favoritePlayerAct(pname)
      this.heartStatus = 'fas fa-heart'
      firebase.firestore().collection('users').doc(this.getUID).update({
        favorites: this.getFavoritedPlayersArray
      })
    },

    unheartPlayer (pname) {
      this.unfavoritePlayerAct(pname)
      this.heartStatus = 'far fa-heart'
      firebase.firestore().collection('users').doc(this.getUID).update({
        favorites: this.getFavoritedPlayersArray
      })
    },

    ...mapActions([
      'favoritePlayerAct',
      'unfavoritePlayerAct'
    ])
  },

  computed: {
    /**
     * returns UI friendly array of API data
     *
     * @returns {Array} alphabetically sorted array of transformed field names
    */
    outputtableData () {
      const final = []
      for (const key of Object.keys(this.playerProfile)) {
        let modKey = this.transformKey(key)
        final.push({ stat: modKey, value: this.playerProfile[key] })
      }
      return final.sort((stat1, stat2) => {
        return stat1.stat.localeCompare(stat2.stat)
      })
    },

    ...mapGetters([
      'userLoggedIn',
      'playerIsFavorite',
      'getUID',
      'getFavoritedPlayersArray'
    ])
  },

  created () {
    const URL1 = `https://nba-players.herokuapp.com/players-stats/${this.lastName}/${this.firstName}`
    axios.get(URL1)
      .then(res => {
        this.playerProfile = res.data
      })
      .catch(err => {
        console.log(err)
      })

    // Make sure front-end reflects firebase
    if (this.playerIsFavorite(this.firstName + ' ' + this.lastName)) {
      this.heartStatus = 'fas fa-heart'
    }
  }
}
</script>

<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

.statistics
  display flex
  justify-content space-between

  .statName
    font-weight bold
    font-size 15px
    flex-grow 10

  .statValue
    flex-grow 0.1
    text-align left
    font-style italic

.heart
  margin-top 10px
  margin-left 90%
</style>
