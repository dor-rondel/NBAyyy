import { store } from '../store/index'

export default (to, from, next) => {
  if (store.getters.userLoggedIn) {
    next()
  } else {
    next('/login')
  }
}
