<template>
  <div>
    <v-list class="d-flex" rounded>
      <v-list-item
        class="mb-0 mr-3 px-10"
        style="flex: inherit"
        v-if="isLoggedIn"
        :to="{name: 'YourFeed'}"
        exact
      >
        <v-list-item-title>Your feed</v-list-item-title>
      </v-list-item>
      <v-list-item
        class="mb-0 mr-3 px-10"
        style="flex: inherit"
        :to="{name: 'GlobalFeed'}"
        exact
      >
        <v-list-item-title>Global feed</v-list-item-title>
      </v-list-item>
      <v-list-item
        class="mb-0 mr-3 px-10"
        style="flex: inherit"
        v-if="tagName"
        :to="{name: 'TagFeed'}"
        exact
      >
        <v-list-item-title># {{ tagName }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FeedToggle',
  props: {
    tagName: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  }
  // computed: {
  //   ...mapState({
  //     isLoading: state => state.feed.isLoading,
  //     feed: state => state.feed.data,
  //     error: state => state.feed.error
  //   }),
  //   currentPage() {
  //     return Number(this.$route.query.page || '1')
  //   },
  //   baseUrl() {
  //     return this.$route.path
  //   },
  //   offset() {
  //     return this.currentPage * limit - limit
  //   },
  //   routeParams() {
  //     return this.$route.params.slug
  //   }
  // },
  // methods: {
  //   ...mapActions({
  //     fetchFeed: 'feed/GET_FEED'
  //   }),
  //   async fetchData() {
  //     const parsedUrl = parseUrl(this.apiUrl)
  //     const stringParams = stringify({
  //       limit,
  //       offset: this.offset || 0,
  //       ...parsedUrl.query
  //     })
  //     const apiUrlWithParams = `${parsedUrl.url}?${stringParams}`
  //     await this.fetchFeed({apiUrl: apiUrlWithParams})
  //   },
  //   handlePageChange(value) {
  //     this.$router.push({
  //       path: this.baseUrl,
  //       query: {page: Number(value)}
  //     })
  //   }
  // },
  // mounted() {
  //   this.fetchData()
  // },
  // watch: {
  //   currentPage() {
  //     this.fetchData()
  //   },
  //   routeParams() {
  //     this.fetchData()
  //   }
  // }
}
</script>
