<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="!authenticated">
        <router-link to="/signin">Sign-in</router-link> |
        <router-link to="/register">Register</router-link> |
      </template>
      <template v-else>
        <router-link to="/dashboard">{{ user.username }}</router-link> |
        <router-link to="/dashboard/edit">Edit</router-link> |
        <a href="#" @click.prevent="signOut">Sign-out</a>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user'
      })
    },

    methods: {
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      async signOut () {
        await this.signOutAction()
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
