<template>
  <v-container class="mt-16">
    <v-row class="justify-center mt-16" no-gutters>
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
            :counter="'>' + 8"
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
              :loading="isSubmitting"
              :disabled="!valid || isSubmitting"
            >
              Submit
            </v-btn>
          </div>
          <v-expand-transition>
            <ValidationErrors
              v-if="validationErrors"
              :errors="validationErrors"
            />
          </v-expand-transition>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

import ValidationErrors from '../../components/ValidationErrors'

export default {
  name: 'Login',
  components: {ValidationErrors},
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
      isSubmitting: state => state.auth.isSubmitting,
      isLoggedIn: state => state.auth.isLoggedIn,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/LOGIN'
    }),
    ...mapMutations({
      setErrors: 'auth/SET_ERRORS'
    }),
    async onSubmitHandler() {
      await this.validationForm()
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        await this.login(user).then(() => {
          this.$router.push({name: 'Home'})
          this.reset()
        })
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
        v => (v && v.length >= 8) || 'Password must be more than 8 characters'
      ]
    },
    reset() {
      this.$refs.form.reset()
    }
  },
  created() {
    this.setErrors(null)
  },
  watch: {
    // isLoggedIn: {
    //   handler(value) {
    //     if (value) {
    //       this.reset()
    //       this.$nextTick(() => {
    //         this.$router.push({name: 'Home'})
    //       })
    //     }
    //   }
    // }
  }
}
</script>

<style scoped></style>
