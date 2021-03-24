<template>
  <v-app-bar app flat height="90" class="elevation-0 border-bottom">
    <router-link :to="{name: 'Home'}">
      <div class="d-flex align-center ml-lg-5">
        <v-img
          alt="logo"
          src="/images/logo-test.gif"
          width="40"
          class="mr-4 rounded-5"
        />
        <div class="font-logo">MediumClone</div>
      </div>
    </router-link>

    <v-spacer />

    <v-list class="d-flex mr-5" color="transparent" dense rounded>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        class="mr-3 px-6"
        :to="item.route"
        color="primary"
        exact
      >
        <v-list-item-icon class="mr-4">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-btn
      color="white black--text"
      elevation="3"
      class="rounded mr-5"
      @click="logoutHandler"
    >
      <v-icon>mdi-power</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'TopBar',
  inheritAttrs: false,
  data: () => ({
    items: []
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT'
    }),
    async logoutHandler() {
      await this.logout()
      await this.$router.push({name: 'Login'})
    },
    loadRoleItems() {
      if (!this.isLoggedIn) {
        this.items = [
          {title: 'Home', icon: 'mdi-home', route: {name: 'Home'}},
          {
            title: 'New Article',
            icon: 'mdi-newspaper',
            route: {name: 'NewArticle'}
          },
          {title: 'Settings', icon: 'mdi-cogs', route: {name: 'Settings'}},
          {
            title: 'User Profile',
            icon: 'mdi-account',
            route: {name: 'UserProfile'}
          }
        ]
      } else {
        this.items = [{title: 'Home', icon: 'mdi-home', route: {name: 'Home'}}]
      }
    }
  },
  mounted() {
    console.log(this.isLoggedIn)
    this.loadRoleItems()
  }
}
</script>
