<template>
  <div>
    <Loading v-if="isLoading" />
    <Error v-if="error" />
    <div v-if="feed">
      <v-card
        class="mb-10 pa-5 article-preview"
        v-for="(article, i) in feed.articles"
        :key="i"
      >
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <router-link
              :to="{
                name: 'UserProfile',
                params: {slug: article.author.username}
              }"
            >
              <v-avatar size="30" class="mr-3">
                <img
                  :src="article.author.image"
                  :alt="article.author.username"
                />
              </v-avatar>
            </router-link>
            <router-link
              :to="{
                name: 'UserProfile',
                params: {slug: article.author.username}
              }"
              class="d-flex flex-column"
            >
              <span class="green--text">{{ article.author.username }}</span>
              <span class="grey--text">{{ article.createdAt }}</span>
            </router-link>
          </div>
          <div>
            ADD TO FAVORITES
          </div>
        </div>
        <router-link :to="{name: 'Article', params: {slug: article.slug}}">
          <v-card-title class="black--text">{{ article.title }}</v-card-title>
          <v-card-text class="grey--text">
            <p>
              {{ article.description }}
            </p>
            <span>Read more...</span>
            <span class="black--text">TAG LIST</span>
          </v-card-text>
        </router-link>
      </v-card>
      <div v-if="feed.articles.length === 0">You don't have articles ...</div>
      <Pagination
        v-if="feed.articlesCount"
        :currentPage="currentPage"
        :length="Math.ceil(feed.articlesCount / limit)"
        @input="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {limit} from '@/helpers/vars'
import Pagination from '@/components/Pagination'
import {stringify, parseUrl} from 'query-string'

export default {
  name: 'Feed',
  components: {Pagination},
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data: () => ({
    limit
  }),
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    },
    routeParams() {
      return this.$route.params.slug
    }
  },
  methods: {
    ...mapActions({
      fetchFeed: 'feed/GET_FEED'
    }),
    async fetchData() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringParams = stringify({
        limit,
        offset: this.offset || 0,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringParams}`
      await this.fetchFeed({apiUrl: apiUrlWithParams})
    },
    handlePageChange(value) {
      this.$router.push({
        path: this.baseUrl,
        query: {page: Number(value)}
      })
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    currentPage() {
      this.fetchData()
    },
    routeParams() {
      this.fetchData()
    }
  }
}
</script>
