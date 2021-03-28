<template>
  <div class="home-page">
    BANNER
    <v-container class="page">
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <Feed :apiUrl="apiUrl" />
        </v-col>
        <v-col cols="12" md="3">POPULAR TAG</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Feed from '../../smartFeed/Feed'
export default {
  name: 'GlobalFeed',
  components: {Feed},
  data: () => ({
    apiUrl: '/articles'
  }),
  computed: {},
  methods: {}
}
</script>
