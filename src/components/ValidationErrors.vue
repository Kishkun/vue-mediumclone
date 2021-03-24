<template>
  <div class="mt-5">
    <!--    <ul>-->
    <!--      <li v-for="(err, i) in Object.entries(this.errors)" :key="i">-->
    <!--        <span class="red&#45;&#45;text">{{ err[0] + ' - ' + err[1] }}</span>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <v-divider class="ma-2" />-->
    <ul>
      <li v-for="(item, i) in errorMessage" :key="i">
        <span class="red--text">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    errors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessage() {
      return Object.keys(this.errors).map(name => {
        const message = this.errors[name]
        return `${name} - ${message}`
      })
    }
  }
}
</script>
