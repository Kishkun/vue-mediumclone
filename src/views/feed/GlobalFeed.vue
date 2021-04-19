<template>
  <div class="home-page">
    <v-container>BANNER</v-container>
    <v-container class="page">
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <Feed :apiUrl="apiUrl" />
        </v-col>
        <v-col cols="12" md="3">
          <TagBanner />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Feed from '../../components/smartFeed/Feed'
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
