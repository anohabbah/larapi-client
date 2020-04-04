<template>
  <p>Redirect to login page...</p>
</template>

<script>
export default {
  created() {
    this.$auth.loginWith('laravel.passport')
  }
}
</script>

<style scoped></style>
