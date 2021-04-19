<template>
  <div class="home__page">
    <TopBanner />
    <v-container class="page">
      <v-row no-gutters class="flex-column-reverse flex-md-row">
        <v-col cols="12" md="8" lg="9">
          <Feed :apiUrl="apiUrl" />
        </v-col>
        <v-col cols="12" md="4" lg="3">
          <TagBanner />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Feed from '@/components/smartFeed/Feed'
import TagBanner from '@/components/tagBanner/TagBanner'

export default {
  name: 'GlobalFeed',
  components: {Feed, TagBanner},
  data: () => ({
    apiUrl: '/articles'
  }),
  computed: {},
  methods: {}
}
</script>
