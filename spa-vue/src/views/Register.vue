<template>
  <form action="#" @submit.prevent="submit">
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" v-model="form.username">
    </div>
    <div>
      <label for="phone">Phone Number</label>
      <input type="tel" name="phone" id="phone" v-model="form.phone">
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="form.email">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="form.password">
    </div>
    <div>
      <label for="password_confirmation">Confirm Password</label>
      <input type="password" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation">
    </div>
    <div>
      <button type="submit">
        Register
      </button>
    </div>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Register',
    data () {
      return {
        form: {
          username: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },

    methods: {
      ...mapActions({
        register: 'auth/register'
      }),

      async submit () {
        await this.register(this.form)
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>