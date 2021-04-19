<template>
  <div>
    <Loading v-if="isLoading" :message="message" />
    <Error v-if="error" />
    <v-banner
      v-if="tag"
      class="ml-md-5 mb-10 mb-md-0"
      sticky
      elevation="3"
      style="top: 120px"
    >
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
