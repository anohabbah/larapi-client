<template>
  <v-layout align-center column justify-center>
    <v-flex md6 sm8 xs12>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="2"
        :loading="loading"
        :options.sync="options"
        :server-items-length="total"
        :footer-props="{
          itemsPerPageOptions: [2, 5, 10, 20, -1]
        }"
        :page="currentPage"
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.created_at | dateForHuman }}</td>
              <td>{{ item.updated_at | dateForHuman }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    items: [],
    headers: [
      { text: '#', value: 'id', sortable: false },
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Created At', value: 'created_at', sortable: true },
      { text: 'Updated At', value: 'updated_at', sortable: true }
    ],
    options: {},
    loading: true
  }),
  computed: {
    ...mapGetters('authors', {
      data: 'getAllAuthors',
      total: 'getTotal',
      currentPage: 'getPage'
    })
  },
  watch: {
    options: {
      handler() {
        this.fetchTableData().then(({ items, page }) => {
          this.setPage(page)
          this.items = items
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('authors', ['fetchAuthors', 'setPage']),
    async fetchTableData() {
      this.loading = true
      const { itemsPerPage, page } = this.options
      let items = []

      if (itemsPerPage > 0) {
        const start = (page - 1) * itemsPerPage
        const end = page * itemsPerPage
        items = this.data.slice(start, end)

        if (!items.length) {
          await this.fetchAuthors({ pageNumber: page, itemsPerPage })
        }

        items = this.data.slice(start, end)
      }

      this.loading = false
      return { items, page }
    }
  }
}
</script>
