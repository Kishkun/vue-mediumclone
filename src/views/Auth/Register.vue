<template>
  <v-container class="fill-height">
    <v-row class="justify-center align-center fill-height" no-gutters>
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
            v-model="password"
            name="password"
            :counter="'>' + 6"
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
            :counter="'>' + 6"
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
            <v-btn depressed color="primary" @click="back">
              Back
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    valid: false,
    loading: false,
    email: '',
    password: '',
    confirmPassword: '',
    emailRules: [],
    passwordRules: [],
    confirmPasswordRules: []
  }),

  methods: {
    async onSubmitHandler() {
      await this.validationForm()
      if (this.$refs.form.validate()) {
        this.reset()
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
      this.confirmPasswordRules = [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password must be more than 6 characters'
      ]
    },
    back() {
      this.$router.push({name: 'Login'})
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped></style>
