<template>
  <form action="#" @submit.prevent="submit">
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" v-model="form.username" :placeholder="user.username">
    </div>
    <div>
      <label for="phone">Phone Number</label>
      <input type="tel" name="phone" id="phone" v-model="form.phone" :placeholder="user.phone">
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="form.email" :placeholder="user.email">
    </div>
    <div>
      <button type="submit">
        Edit Info
      </button>
    </div>
  </form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
    name: 'Update',
    data () {
      return {
        form: {
          username: '',
          phone: '',
          email: ''
        }
      }
    },

    methods: {
      ...mapActions({
        update: 'auth/update'
      }),

      async submit () {
        await this.update(this.form)
        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>