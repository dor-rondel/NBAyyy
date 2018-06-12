import test from 'ava'
import { shallow } from 'vue-test-utils'
import AppRegister from '../../src/components/AppRegister.vue'

// AppRegister.vue

// COMPUTED -- passwordsMatch

test('Should check that passwords are equal', t => {
	const wrapper = shallow(AppRegister)
	
	wrapper.setData({
		password: '123456',
		confirmedPass: '123456'
	})

	const result = wrapper.vm['$options'].computed.passwordsMatch.call(wrapper.vm)

	t.true(result)
})

test('Should check that passwords are not equal', t => {
	const wrapper = shallow(AppRegister)
	
	wrapper.setData({
        	password: '123456',
        	confirmedPass: '123457'
	})

	const result = wrapper.vm['$options'].computed.passwordsMatch.call(wrapper.vm)

	t.is(result, 'Passwords do not match')
})


// COMPUTED -- passwordValidLength
test('Should check that passwords are not a valid length', t => {
	const wrapper = shallow(AppRegister)
	
	wrapper.setData({
		password: '123456',
		confirmedPass: '123456'
	})

	const result = wrapper.vm['$options'].computed.passwordValidLength.call(wrapper.vm)

	t.true(result)
})

test('Should check that passwords are not a valid length', t => {
	const wrapper = shallow(AppRegister)
	
	wrapper.setData({
		password: '1234',
		confirmedPass: '1234'
	})

	const result = wrapper.vm['$options'].computed.passwordValidLength.call(wrapper.vm)

	t.is(result, 'Passwords must be at least 6 characters long')
})