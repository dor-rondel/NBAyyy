import test from 'ava'
import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { store } from '../../src/store/index'

const localVue = createLocalVue()

localVue.use(Vuex)

test.beforeEach(t => {
    store.state.favoritedPlayers = ['Lebron James', 'Stephen Curry', 'Kevin Durant', 'Kyrie Irving']
    store.state.loggedIn = false
})

// GETTERS
test('Should get back the favoritedPlayers array', t => {
    const expected = ['Lebron James', 'Stephen Curry', 'Kevin Durant', 'Kyrie Irving']
    const actual = store.getters.getFavoritedPlayersArray
    t.deepEqual(actual, expected, 'getter returned correct favoritedPlayers array')
})

test('Should get back the user login status', t => {
    const expected = false
    const actual = store.getters.userLoggedIn
    t.is(actual, expected, 'getter returned user login status correctly')
})

test('Should return that user is not logged in', t => {
    const expected = true
    const actual = store.getters.userLoggedIn
    t.not(actual, expected, 'getter returned user login status correctly')
})

test('Should return that Kyrie Irving is in the favoritedPlayer array', t => {
    const expected = true
    const actual = store.getters.playerIsFavorite("Kyrie Irving")
    t.is(actual, expected, 'getter returned user login status correctly')
})

test('Should return that Kyri Irving is not in the favoritedPlayer array', t => {
    const expected = false
    const actual = store.getters.playerIsFavorite("Kyri Irving")
    t.is(actual, expected, 'getter returned user login status correctly')
})

// ACTIONS
test('Should sign user in', t => {
    const expected = true
    store.dispatch('signUserInAct')
    const actual =  store.getters.userLoggedIn
    t.is(actual, expected, 'sign in works')
})

test('Should sign user out', t => {
    store.state.loggedIn = true
    const expected = false
    store.dispatch('signUserOutAct')
    const actual =  store.getters.userLoggedIn
    t.is(actual, expected, 'sign out works')
})

test('Should add player to favoritedPlayer array', t => {
    const expected = ['Lebron James', 'Stephen Curry', 'Kevin Durant', 'Kyrie Irving', 'James Harden']
    store.dispatch('favoritePlayerAct', 'James Harden')
    const actual =  store.getters.getFavoritedPlayersArray
    t.deepEqual(actual, expected, 'player favorited correctly')
})

test('Should remove player from favoritedPlayer array', t => {
    const expected = ['Lebron James', 'Stephen Curry', 'Kyrie Irving']
    store.dispatch('unfavoritePlayerAct', 'Kevin Durant')
    const actual =  store.getters.getFavoritedPlayersArray
    t.deepEqual(actual, expected, 'player unfavorited correctly')
})