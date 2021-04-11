<template>
  <div>
    <div v-if="isLoading">Loading feed...</div>
    <div v-if="error">Something bad happened</div>
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
              <span class="grey--text font__14">{{ article.createdAt }}</span>
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
      <div>PAGINATION</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Feed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    })
  },
  methods: {
    ...mapActions({
      fetchFeed: 'feed/GET_FEED'
    })
  },
  async mounted() {
    await this.fetchFeed({apiUrl: this.apiUrl})
  }
}
</script>
