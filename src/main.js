import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router/index'
import { store } from './store/index'
import * as firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDIC7QmReJD4EqRemBAEcspWyBkckWmcvM',
      authDomain: 'nbayyy-417a8.firebaseapp.com',
      databaseURL: 'https://nbayyy-417a8.firebaseio.com',
      projectId: 'nbayyy-417a8',
      storageBucket: 'nbayyy-417a8.appspot.com',
      messagingSenderId: '714897416225'
    })

    // keep user logged in on refresh
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('signUserInAct', user)
        this.$store.dispatch('setUIDAct', user.uid)
      }
    })
  }
}).$mount('#app')
