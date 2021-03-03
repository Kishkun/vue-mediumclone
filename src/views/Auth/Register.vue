<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="6">
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
            :counter="5"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            name="confirm-password"
            type="password"
            :rules="[
              v => !!v || 'Password is required',
              v => v === password || 'Password should match'
            ]"
            label="Confirm password"
            :counter="'>' + 5"
            required
          ></v-text-field>
          <v-btn
            depressed
            color="primary"
            class="mr-4 mt-5"
            @click="onSubmitHandler"
            :loading="loading"
            :disabled="!valid || loading"
          >
            Submit
          </v-btn>
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
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must be more than 5 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    async onSubmitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        // try {
        //   await this.$store.dispatch('loginUser', user)
        //   await this.$router.push('/')
        // } catch (e) {
        //   console.log(e)
        // }
        this.loading = false
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped></style>
