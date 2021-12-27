<template>
  <ValidationObserver action="#" ref="observer" v-slot="{ invalid, changed }" tag="form" @submit.prevent="submit()">
    <div>
      <ValidationProvider 
        rules="max:30" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="form.username" :placeholder="user.username">
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
        rules="minmax:9,11|numeric" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="phone">Phone Number</label>
        <input type="tel" name="phone" id="phone" v-model="form.phone" :placeholder="user.phone">
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
        rules="email|max:50" 
        :bails="false" 
        v-slot="{ errors }"
      > 
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="form.email" :placeholder="user.email">
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
      <button type="submit" :disabled="invalid || !changed">
        Edit Info
      </button>
    </div>
  </ValidationObserver>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
  import { required, email, max, numeric } from 'vee-validate/dist/rules';

  extend('numeric', numeric)

  extend('max', {
    ...max,
    message: `Maximum characters reached.`
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
    },

    components: {
      ValidationObserver,
      ValidationProvider
    }
  }
</script>