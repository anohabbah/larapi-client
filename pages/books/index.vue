<template>
  <v-layout align-center column justify-center>
    <v-flex md6 sm8 xs12>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    headers: [],
    data: []
  })
}
</script>
