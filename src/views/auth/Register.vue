<template>
  <v-container class="mt-16">
    <v-row class="justify-center mt-16" no-gutters>
      <v-col cols="12" sm="4">
        <h2 class="text-h2 text-center mb-4">Sign Up</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            name="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="username"
            name="username"
            :rules="usernameRules"
            label="User name"
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
          <v-text-field
            v-model="confirmPassword"
            name="confirm-password"
            type="password"
            :rules="confirmPasswordRules"
            label="Confirm password"
            :counter="'>' + 8"
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
            <v-btn depressed color="primary" @click="back">
              Back
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
import {mapActions, mapMutations, mapState} from 'vuex'
import ValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'Register',
  components: {ValidationErrors},
  data: () => ({
    valid: false,
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    emailRules: [],
    usernameRules: [],
    passwordRules: [],
    confirmPasswordRules: []
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
      register: 'auth/REGISTER'
    }),
    ...mapMutations({
      setErrors: 'auth/SET_ERRORS'
    }),
    async onSubmitHandler() {
      await this.validationForm()
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          username: this.username,
          password: this.password
        }
        await this.register(user)
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
      this.usernameRules = [v => !!v || 'User name is required']
      this.passwordRules = [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters'
      ]
      this.confirmPasswordRules = [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password must be more than 8 characters'
      ]
    },
    back() {
      this.$router.push({name: 'Login'})
    },
    reset() {
      this.$refs.form.reset()
    }
  },
  created() {
    this.setErrors(null)
  },
  watch: {
    isLoggedIn: {
      handler(value) {
        if (value) {
          this.reset()
          this.$nextTick(() => {
            this.$router.push({name: 'GlobalFeed'})
          })
        }
      }
    }
  }
}
</script>

<style scoped></style>
