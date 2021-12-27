<template>
  <ValidationObserver action="#" ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
    <div>
      <ValidationProvider 
        rules="required|max:30" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="username">Username</label>
        <input 
          type="text" 
          name="username" 
          id="username" 
          v-model="form.username"
        >
        <div />
        <ul style="display:table-row">
          <li
            v-for="error in errors" 
            style="color:FireBrick;list-style-type:none;" 
            v-bind:key="error"
          >
            {{ error }}
          </li>
        </ul>
      </ValidationProvider>
    </div>
    <p />
    <div>
      <ValidationProvider 
        rules="required|max:50" 
        :bails="false" 
        v-slot="{ errors }"
      >
        <label for="password">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          v-model="form.password"
        >
        <div />
        <ul style="display:table-row">
          <li
            v-for="error in errors" 
            style="color:FireBrick;list-style-type:none;" 
            v-bind:key="error"
          >
            {{ error }}
          </li>
        </ul>
      </ValidationProvider>
    </div>
    <p />
    <div>
      <button type="submit" :disabled="invalid">
        Sign in
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ValidationObserver, ValidationProvider ,extend } from 'vee-validate';
  import { required, max } from 'vee-validate/dist/rules';

  extend('max', {
    ...max,
    message: `Maximum characters reached.`
  })

  extend('required', {
    ...required,
    message: 'This field is required'
  });

  export default {
    name: 'SignIn',
    data () {
      return {
        form: {
          username: '',
          password: '',
        }
      }
    },

    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),

      async submit () {
        await this.signIn(this.form)
        this.$router.replace({ name: 'home' })
      }
    },

    components: {
      ValidationObserver,
      ValidationProvider
    }
  }
</script>