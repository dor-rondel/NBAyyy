import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    favoritedPlayers: [], // String Array of player names
    loggedIn: false,
    uid: ''
  },

  getters: {
    /**
     * Returns favorited players array from state.
     *
     * @returns {Array} of type String
    */
    getFavoritedPlayersArray (state) {
      return state.favoritedPlayers
    },

    /**
     * Returns true if user logged in else returns false.
     *
     * @returns {Boolean}
    */
    userLoggedIn (state) {
      return state.loggedIn
    },

    /**
     * Returns true if player is part of favoritedPlayers
     * else returns false.
     *
     * @param {String} pname the name of the player being searched
     * @returns {Boolean}
    */
    playerIsFavorite (state) {
      return pname => {
        return state.favoritedPlayers.includes(pname)
      }
    },

    /**
     * Returns uid of user from firebase
     *
     * @returns {String} unique UID
    */
    getUID (state) {
      return state.uid
    }
  },

  mutations: {
    /** Signs user in. */
    signUserIn (state) {
      state.loggedIn = true
    },

    /** Signs user out */
    signUserOut (state) {
      state.loggedIn = false
    },

    /** favorites player */
    favoritePlayer (state, pname) {
      state.favoritedPlayers.push(pname)
    },

    /** unfavorites player */
    unfavoritePlayer (state, pname) {
      state.favoritedPlayers.splice(state.favoritedPlayers.indexOf(pname), 1)
    },

    /** sets players favorited array to firebase's version */
    setFavoriteArray (state, payload) {
      state.favoritedPlayers = payload
    },

    /** sets UID from firebase */
    setUID (state, payload) {
      state.uid = payload
    }
  },
  actions: {
    signUserInAct ({commit}) {
      commit('signUserIn')
    },

    signUserOutAct ({commit}) {
      commit('signUserOut')
    },

    favoritePlayerAct ({commit}, pname) {
      commit('favoritePlayer', pname)
    },

    unfavoritePlayerAct ({commit}, pname) {
      commit('unfavoritePlayer', pname)
    },

    setFavoriteArrayAct ({commit}, payload) {
      commit('setFavoriteArray', payload)
    },

    setUIDAct ({commit}, payload) {
      commit('setUID', payload)
    }
  }
})
