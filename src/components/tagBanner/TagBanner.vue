<template>
  <div class="ml-md-5 mb-10 mb-md-0">
    <Loading v-if="isLoading" :message="message" />
    <Error v-if="error" />
    <v-banner v-if="tags" sticky elevation="3" style="top: 120px">
      <h6 class="text-h6 mb-5">Popular Tags:</h6>
      <div class="d-flex flex-wrap align-center">
        <v-btn
          link
          v-for="(popularTag, i) of tags"
          :key="i"
          :to="{name: 'TagFeed', params: {slug: popularTag}}"
          class="mr-5 mb-3"
        >
          {{ popularTag }}
        </v-btn>
      </div>
    </v-banner>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'TagBanner',
  data: () => ({
    message: 'Loading tag...'
  }),
  computed: {
    ...mapState({
      isLoading: state => state.tag.isLoading,
      tags: state => state.tag.data,
      error: state => state.tag.error
    })
  },
  methods: {
    ...mapActions({
      fetchTags: 'tag/GET_TAGS'
    }),
    async fetchData() {
      await this.fetchTags()
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
