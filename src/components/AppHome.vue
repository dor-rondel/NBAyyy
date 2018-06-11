<template lang="pug">
  v-content
    main
        video(autoplay muted loop)
            source(src="lebron.mp4" type="video/mp4")
        v-container
            v-layout(row)
                v-flex(xs10 offset-xs1 md8 offset-md2 lg6 offset-lg3).about-container
                    h2 NBAyyy
                    br
                    .description
                        p Search individual NBA player's stats including games played,
                            | minutes played, rebounds per game, steals per game, points per game,
                            | three point percentage, and many many more statistics
                            | (as well as graphs). Additionally, if you make an account, you can
                            | favorite players to get a quick overview for their stats.
                        p Simply enter the player's name below, and click on the magnifying glass!
                    form
                        v-text-field(label="Search Player"
                                     color="red lighten-1"
                                     required
                                     v-model="playerName")
                        v-btn(flat small type="submit" @click.prevent="doSearch")
                            v-icon(left) fas fa-search
</template>

<script>
export default {
  name: 'app-home',

  data () {
    return {
      playerName: ''
    }
  },

  computed: {
    /**
     *  Returns array of playerName with first name in [0] and
     *  last name in [1], will be used for axios ajax calls
     */
    getNameArray () {
      return this.playerName.split(' ')
    }
  },

  methods: {
    /**
     *  Action done for when user submits search, wil redirect to
     *  the appropriate page using vue-router
     */
    doSearch () {
      if (this.playerName !== '') { // enforce required attribute
        let playerArr = this.getNameArray
        this.$router.push(`/player/${this.makeCapitalCased(playerArr[1])}/${this.makeCapitalCased(playerArr[0])}`)
      }
    },

    /**
     *  Returns formatted name to use for API search
     *
     *  @param {String} str player first or last name
     *  @return {String} Capital case version of the name
     */
    makeCapitalCased (str) {
      return str[0].toUpperCase() + str.substr(1, str.length - 1).toLowerCase()
    }
  }
}
</script>

<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Audiowide|Titillium+Web');

video
    position fixed
    right 0
    bottom 0
    min-width 100%
    min-height 100%
    filter grayscale(80%)
    z-index 0

main
    .about-container
        background-color rgba(255, 255, 255, 0.8)
        margin-top 18vh
        z-index 1
        font-family 'Titillium Web', sans-serif
        border 2px solid #333
        border-radius 10px
        padding 10px 0px

        @media (max-width: 350px)
            margin-top 2vh

        @media (min-width: 351px) and (max-width: 400px)
            margin-top 4vh

        @media (min-width: 401px) and (max-width: 450px)
            margin-top 10vh

        @media (min-width: 451px) and (max-width: 500px)
            margin-top 13vh

        @media (min-width: 551px) and (max-width: 600px)
            margin-top 15vh

        h2
            text-align center
            color #ef5350
            font-family 'Audiowide', cursive  // specitficityyyy
            font-size 2rem

        .description
            width 75%
            margin-left 10%
            font-size 16px
            font-weight bold

        form
            margin 0 auto
            width 50%
            display flex
            margin-top 2vh

            @media (max-width: 350px)
                width 85%

            @media (min-width: 351px) and (max-width: 400px)
                width 80%

            @media (min-width: 401px) and (max-width: 450px)
                width 75%

            @media (min-width: 451px) and (max-width: 500px)
                width 70%

            @media (min-width: 551px) and (max-width: 600px)
                width 65%

            button
                height 50px
                width 10px
                margin-left -10px
</style>
