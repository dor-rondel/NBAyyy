import test from 'ava'
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { store } from '../../src/store/index'
import PlayerCard from '../../src/components/PlayerCard.vue'

// PlayerCard.vue

const localVue = createLocalVue()

localVue.use(Vuex)

test('Should transform API fields to UI friendly string', t => {
    const expected = 'Minutes Per Game'
    const wrapper = shallow(PlayerCard, {
        mocks: {
            $store: store
        },
        localVue
    })
	
    const actual = wrapper.vm['$options'].methods.transformKey('minutes_per_game')
    t.is(actual, expected, 'correctly transforms "_" delimited API fields')
})

test('Should favorite a player and adjust icon accordingly', t => {
    const expected = 'fas fa-heart'
    const wrapper = shallow(PlayerCard, {
        mocks: {
            $store: store
        },
        localVue
    })
    
    wrapper.vm['$options'].methods.toggleFavorite.call(wrapper.vm)
    const actual = wrapper.vm._data.heartStatus
    t.is(actual, expected, 'icon toggled correctly')
})

test('Return array of alphabetically sorted transformed field names', t => {
    const expected = [
        { stat: 'Blocks Per Game', value: 9 },
        { stat: 'Games Played', value: 2 },
        { stat: 'Team Acronym', value: 'cav' }
    ]
    
    const wrapper = shallow(PlayerCard, {
        mocks: {
            $store: store,
        },
        localVue
    })

    wrapper.setData({
        playerProfile: {
            team_acronym: 'cav',
            blocks_per_game: 9,
            games_played: 2,
        }
    })
    
    const actual = wrapper.vm['$options'].computed.outputtableData.call(wrapper.vm)
    t.deepEqual(actual, expected, 'stat output array created successfully')
})