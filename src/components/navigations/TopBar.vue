<template>
  <v-app-bar
    app
    flat
    height="90"
    color="orange lighten-2"
    class="elevation-0 border-bottom"
  >
    <router-link :to="{name: 'GlobalFeed'}">
      <div class="d-flex align-center ml-lg-5">
        <v-img
          alt="logo"
          src="/images/logo.gif"
          width="40"
          class="mr-4 rounded-5"
        />
        <div class="font-logo">MediumClone</div>
      </div>
    </router-link>

    <v-spacer />

    <v-list
      class="d-flex"
      :class="currentUser ? 'mr-2 mr-md-5' : ''"
      color="transparent"
      dense
      rounded
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        class="mr-3 px-3 px-md-6"
        :to="item.route"
        color="red"
        exact
      >
        <v-list-item-icon class="mr-1 mr-md-4">
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
      v-if="currentUser"
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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'TopBar',
  data: () => ({
    items: []
  }),
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isAnonymous: 'auth/isAnonymous',
      isLoggedIn: 'auth/isLoggedIn'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT',
      getCurrentUser: 'auth/GET_CURRENT_USER'
    }),
    async logoutHandler() {
      await this.logout()
      await this.$router.push({name: 'Login'})
    },
    loadRoleItems() {
      if (this.currentUser) {
        this.items = [
          {title: 'Home', icon: 'mdi-home', route: {name: 'GlobalFeed'}},
          {
            title: 'New Article',
            icon: 'mdi-newspaper',
            route: {name: 'CreateArticle'}
          },
          {title: 'Settings', icon: 'mdi-cogs', route: {name: 'Settings'}},
          {
            title: this.currentUser.username,
            icon: 'mdi-account',
            route: {
              name: 'UserProfile',
              params: {slug: this.currentUser.username}
            }
          }
        ]
      } else {
        this.items = [
          {title: 'Home', icon: 'mdi-home', route: {name: 'GlobalFeed'}},
          {
            title: 'Sign in',
            icon: 'mdi-clipboard-account',
            route: {name: 'Login'}
          },
          {
            title: 'Sign up',
            icon: 'mdi-account-plus',
            route: {name: 'Register'}
          }
        ]
      }
    }
  },
  async mounted() {
    await this.getCurrentUser().then(() => this.loadRoleItems())
  },
  watch: {
    currentUser() {
      this.loadRoleItems()
    }
  }
}
</script>
