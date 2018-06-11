import test from 'ava'
import { shallow } from 'vue-test-utils'
import AppHome from '../../src/components/AppHome.vue'

// AppHome.vue
test('Should return array words in string sentence', t => {
	const expected = ['Lebron', 'James']
	const wrapper = shallow(AppHome)
	
	wrapper.setData({
		playerName: 'Lebron James'
	})

	const actual = wrapper.vm['$options'].computed.getNameArray.call(wrapper.vm)

	t.deepEqual(actual, expected)
})

test('Should return array words in string sentence', t => {
	const expected = 'Lebron'
	const wrapper = shallow(AppHome)
	
	wrapper.setData({
		playerName: 'LEbron James'
	})

	const nameArray = wrapper.vm['$options'].computed.getNameArray.call(wrapper.vm)
	const actual = wrapper.vm['$options'].methods.makeCapitalCased(nameArray[0])
								
	t.is(actual, expected, 'Properly makes word capital-cased')
})