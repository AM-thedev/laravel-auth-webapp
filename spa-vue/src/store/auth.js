import axios from 'axios'


export default {
  namespaced: true,

  state: {
    authenticated: false,
    user: null
  },

  getters: {
    authenticated (state) {
      return state.authenticated
    },

    user (state) {
      return state.user
    },
  },

  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },

    SET_USER (state, value) {
      state.user = value
    }
  },

  actions: {
    async register ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('api/register', credentials).then((res) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      })

      return dispatch('me')
    },

    async signIn ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('api/login', credentials).then((res) => {
        console.log('Token:', res.data.token)
        //this.$cookies.set("bearer",`Bearer ${res.data.token}`,"15MIN")
        //console.log('Cookie bearer:', this.$cookies.get("bearer"))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      })

      return dispatch('me')
    },

    async signOut ({ dispatch }) {
      await axios.post('api/logout').then(() => {
        axios.defaults.headers.common['Authorization'] = null
      })

      return dispatch('me')
    },

    async update ({ dispatch }, credentials) {
      await axios.put('api/user', credentials)

      return dispatch('me')
    },

    async me ({ commit }) {
      await axios.get('/api/user').then((res) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', res.data)
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      })
    }
  }
}