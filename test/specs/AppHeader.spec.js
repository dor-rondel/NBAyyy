import test from 'ava'
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { store } from '../../src/store/index'
import AppHeader from '../../src/components/AppHeader.vue'

// AppHeader.vue

const localVue = createLocalVue()

localVue.use(Vuex)

test('Should return unauthenticated nav items', t => {
    const expected = [
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

    const wrapper = shallow(AppHeader, {
        mocks: {
            $store: store
        },
        localVue
    })

    const actual = wrapper.vm['$options'].computed.menuItems.call(wrapper.vm)
    t.deepEqual(actual, expected, 'correctly couples nav items & auth status')
})