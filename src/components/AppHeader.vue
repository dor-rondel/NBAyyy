<template lang="pug">
  v-content
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
    v-toolbar(flat)
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
      authenticated: false,
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
      if (this.authenticated) {
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
@import url('https://fonts.googleapis.com/css?family=Chewy');

lightRed = #ef5350

.hidden
  display none

nav
  background-color rgba(0, 0, 0, 0)

  .title
    font-family 'Chewy', cursive
    padding-bottom 0.18em

  a
    text-decoration none
    color lightRed

  .style-side-by-side
    display flex

    @media (max-width: 400px)
      margin-left 25%
      padding-right 40%

    @media (min-width: 401px) and (max-width: 500px)
      margin-left 35%
      padding-right 50%

    @media (min-width: 501px) and (max-width: 600px)
      margin-left 45%
      padding-right 55%

    i
      margin-right 0.5em
      color #444
</style>
