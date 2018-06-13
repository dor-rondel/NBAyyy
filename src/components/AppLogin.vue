<template lang="pug">
    v-container
        v-layout(row)
            v-flex(xs12 sm6 offset-sm3)
                v-card
                    v-card-title(primary-title).headline Login
                    v-card-text.instructions Fill out the form below in order to login to NBAyyy.
                    v-container
                        form
                            v-layout(row)
                                v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
                                    v-text-field(type="text"
                                                label="E-mail"
                                                v-model="email"
                                                color="red lighten-1"
                                                required
                                                prepend-icon="far fa-envelope")
                            v-layout(row)
                                v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
                                    v-text-field(type="text"
                                                label="Password"
                                                v-model="password"
                                                color="red lighten-1"
                                                required
                                                prepend-icon="fas fa-key")
                            br
                            v-layout(row justify-center)
                                v-flex(xs8 offset-xs2 sm6 offset-sm3)
                                    v-btn(color="red lighten-1"
                                          @click.prevent="doLogin").white--text Login!
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'app-login',

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    doLogin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.dispatch('signUserInAct')
          this.$router.push('/user/profile')
        })
        .catch(error => console.log(error))
    }
  }
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
