<template>
  <ValidationObserver action="#" ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
    <div>
      <ValidationProvider 
        rules="required|max:30" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="form.username">
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
        rules="required|minmax:9,11|numeric" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="phone">Phone Number</label>
        <input type="tel" name="phone" id="phone" v-model="form.phone">
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
        rules="required|email|max:50" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="form.email">
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
        <input type="password" name="password" id="password" v-model="form.password" ref="password">
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
        rules="required|max:50|confirmed:password" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation" data-vv-as="password">
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
        Register
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ValidationObserver, ValidationProvider ,extend } from 'vee-validate';
  import { required, email, max, numeric, confirmed } from 'vee-validate/dist/rules';

  extend('confirmed', {
    ...confirmed,
    message: 'Passwords must match.'
  })

  extend('numeric', {
    ...numeric,
    message: 'Phone number only accepts numbers.'
  })

  extend('max', {
    ...max,
    message: 'Maximum characters reached.'
  })

  extend('minmax', {
    validate(value, { min, max }) {
      return value.length >= min && value.length <= max
    },
    params: ['min', 'max'],
    message: 'Phone number must be between 9 and 11 digits.'
  })

  extend('required', {
    ...required,
    message: 'This field is required.'
  });

  extend('email', email)

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
    },

    components: {
      ValidationObserver,
      ValidationProvider
    }
  }
</script>