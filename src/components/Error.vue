<template>
  <div>{{ error }}</div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: String,
      default: 'Something bad happened...'
    }
  }
}
</script>
