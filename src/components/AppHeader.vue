<template lang="pug">
  .app-header-wrapper
    // Mobile
    v-navigation-drawer(temporary app v-model="sideNav")
      v-list
        v-list-tile(v-for="item in menuItems"
                    :key="item.name"
                    :to="item.link")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content {{ item.name }}

    // Tablet & Desktop
    v-toolbar(flat color="rgba(0, 0, 0, 0.1)")
      v-icon.hidden-sm-and-up(@click.stop="sideNav = !sideNav") fas fa-bars
      v-toolbar-title.title
        router-link(to="/" exact)
          .style-side-by-side
            v-icon(left) fas fa-basketball-ball
            h1 NBAyyy
      v-spacer
      v-toolbar-items.hidden-xs-only
        v-btn(v-for="item in menuItems"
              :to="item.link"
              :key="item.name"
              flat
              exact
              color="red lighten-1")
              v-icon(left) {{ item.icon }}
              | {{ item.name }}
</template>

<script>
export default {
  name: 'app-header',

  data () {
    return {
      authenticated: this.$store.getters.userLoggedIn,
      sideNav: false
    }
  },

  computed: {
    menuItems () {
      let menuItems = [
        {
          name: 'Login',
          link: '/login',
          icon: 'fas fa-door-open'
        },
        {
          name: 'Register',
          link: '/register',
          icon: 'far fa-clipboard'
        }
      ]
      if (this.$store.getters.userLoggedIn) {
        menuItems = [
          {
            name: 'Profile',
            link: '/profile',
            icon: 'fas fa-user-circle'
          },
          {
            name: 'Logout',
            link: '/',
            icon: 'fas fa-sign-out-alt'
          }
        ]
      }
      return menuItems
    }
  }
}
</script>

<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Audiowide');

lightRed = #ef5350

.hidden
  display none

nav
  z-index 2
  background-color transparent

  .title
    font-family 'Audiowide', cursive
    padding-bottom 0.18em

  a
    text-decoration none
    color lightRed

  .style-side-by-side
    display flex

    @media (min-width: 350px) and (max-width: 400px)
      margin-left 17%
      padding-right 40%

    @media (min-width: 401px) and (max-width: 450px)
      margin-left 25%
      padding-right 50%

    @media (min-width: 451px) and (max-width: 500px)
      margin-left 40%
      padding-right 45%

    @media (min-width: 501px) and (max-width: 600px)
      margin-left 45%
      padding-right 50%

    @media (min-width: 551px) and (max-width: 600px)
      margin-left 50%
      padding-right 60%

    i
      margin-right 0.5em
      color #444
</style>
