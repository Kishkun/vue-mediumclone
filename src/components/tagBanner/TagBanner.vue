<template>
  <v-banner class="ml-5" sticky elevation="3" style="top: 120px">
    <div v-if="isLoading">Loading popular tags...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="tag">
      <h6 class="text-h6 mb-5">Popular Tags:</h6>
      <div class="d-flex flex-wrap align-center">
        <v-btn
          link
          v-for="(popularTag, i) of tag"
          :key="i"
          :to="{name: 'TagBanner', params: {slug: popularTag}}"
          class="mr-5 mb-3"
        >
          {{ popularTag }}
        </v-btn>
      </div>
    </div>
  </v-banner>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'TagBanner',
  computed: {
    ...mapState({
      isLoading: state => state.tag.isLoading,
      tag: state => state.tag.data,
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
