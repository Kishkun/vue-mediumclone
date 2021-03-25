<template>
  <div class="main-wrapper">
    <TopBar />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import TopBar from '../components/navigations/TopBar'

export default {
  main: 'MainLayout',
  components: {TopBar}
}
</script>
