<template>
  <v-container class="fill-height">
    <v-row class="justify-center align-center fill-height" no-gutters>
      <v-col cols="12" sm="4">
        <h2 class="text-h2 text-center mb-4">Sign In</h2>
        <router-link
          :to="{name: 'Register'}"
          class="d-block text-center text-h6 font-weight-medium success--text"
        >
          Need an account?
        </router-link>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            name="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            name="password"
            :counter="'>' + 6"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <div class="d-flex justify-lg-space-between mt-5">
            <v-btn
              depressed
              color="success"
              @click="onSubmitHandler"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Submit
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    valid: false,
    email: '',
    password: '',
    confirmPassword: '',
    emailRules: [],
    passwordRules: []
  }),
  computed: {
    ...mapState({
      loading: state => state.auth.loading,
      loginSuccess: state => state.auth.login
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/LOGIN'
    }),
    async onSubmitHandler() {
      await this.validationForm()
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.login(user)
        //this.reset()
      }
    },
    validationForm() {
      this.emailRules = [
        v => !!v || 'E-mail is required',
        v =>
          /^([a-zA-Z0-9_\-\\./]+)@([a-zA-Z0-9_\-\\./]+)\.([a-zA-Z]{2,5})$/.test(
            v
          ) || 'E-mail must be valid'
      ]
      this.passwordRules = [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ]
    },
    reset() {
      this.$refs.form.reset()
    }
  },
  watch: {
    loginSuccess: {
      handler(value) {
        if (value) {
          this.reset()
          this.$nextTick(() => {
            this.$router.push({name: 'Home'})
          })
        }
      }
    }
  }
}
</script>

<style scoped></style>
