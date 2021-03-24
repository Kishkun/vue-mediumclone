<template>
  <div class="main-wrapper">
    <TopBar v-if="currentUser" />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import TopBar from '../components/navigations/TopBar'
import {mapActions, mapGetters} from 'vuex'

export default {
  main: 'MainLayout',
  components: {TopBar},
  data: () => ({
    mini: true,
    drawer: true
  }),
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },
  methods: {
    ...mapActions({
      getCurrentUser: 'auth/GET_CURRENT_USER'
    })
  },
  async mounted() {
    await this.getCurrentUser()
  }
}
</script>
