<template>
  <v-container class="pa-10" fluid v-if="currentUser">
    <img
      v-if="currentUser.image"
      :src="currentUser.image"
      :alt="currentUser.username"
    />
    <div>UserProfile page, username: {{ slug }}</div>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'UserProfile',
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  }
}
</script>
