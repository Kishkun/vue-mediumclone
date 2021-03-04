<template>
  <div class="main-wrapper is-hidden" :class="{'is-hidden': isFixed}">
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  main: 'MainLayout',
  data: () => ({
    mini: true,
    drawer: true
  }),
  computed: {
    isFixed() {
      return this.$vuetify.breakpoint.lgAndDown
    }
  },
  methods: {},
  watch: {}
}
</script>
