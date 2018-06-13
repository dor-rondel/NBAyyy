<template lang="pug">
    v-container
        v-layout(row)
            v-flex(xs12 sm6 offset-sm3)
                v-card
                    v-card-title(primary-title).headline Register
                    v-card-text.instructions Fill out the form below in order to register to NBAyyy.
                    v-container
                        form
                            v-layout(row)
                                v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
                                    v-text-field(type="text"
                                                label="E-mail"
                                                v-model="email"
                                                color="red lighten-1"
                                                prepend-icon="far fa-envelope"
                                                required)
                            v-layout(row)
                                v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
                                    v-text-field(type="text"
                                                label="Password"
                                                v-model="password"
                                                color="red lighten-1"
                                                prepend-icon="fas fa-key"
                                                required)
                                                        v-layout(row)
                            v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
                                v-text-field(type="text"
                                            label="Confirm password"
                                            v-model="confirmedPass"
                                            color="red lighten-1"
                                            prepend-icon="fas fa-check-circle"
                                            required
                                            :rules="[passwordsMatch, passwordValidLength]")
                            br
                            v-layout(row justify-center)
                                v-flex(xs8 offset-xs2 sm6 offset-sm3)
                                    v-btn(color="red lighten-1"
                                          @click.prevent="doRegister").white--text Register!
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'app-login',

  data () {
    return {
      email: '',
      password: '',
      confirmedPass: ''
    }
  },

  methods: {
    doRegister () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.dispatch('setUIDAct', user.user.uid)
          this.$store.dispatch('signUserInAct')
          firebase.firestore().collection('users').doc(user.user.uid).set({
            favorites: []
          })
          this.$router.push('/user/profile')
        })
        .catch(error => console.log(error))
    }
  },

  computed: {
    passwordsMatch () {
      return (this.password === this.confirmedPass) ? true : 'Passwords do not match'
    },

    passwordValidLength () {
      return (this.password.length >= 6 && this.confirmedPass.length >= 6)
      // eslint-disable-next-line
                  ? true : 'Passwords must be at least 6 characters long'
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
