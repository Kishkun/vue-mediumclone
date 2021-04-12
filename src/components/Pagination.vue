<template>
  <div class="text-center mb-5">
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: [Number, String],
      required: true
    },
    length: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
