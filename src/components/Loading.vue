<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    message: {
      type: String,
      default: 'Loading feed...'
    }
  }
}
</script>
