const mutationTypes = {
  ADD_ITEMS: 'ADD_ITEMS',
  SET_TOTAL: 'SET_TOTAL',
  SET_PAGE: 'SET_PAGE'
}

export const state = () => ({
  items: [],
  page: 1,
  total: 0
})

export const mutations = {
  [mutationTypes.ADD_ITEMS](state, payload) {
    state.items = [...state.items, ...payload]
  },
  [mutationTypes.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [mutationTypes.SET_PAGE](state, page) {
    state.page = page
  }
}

export const actions = {
  async fetchAuthors({ commit, state }, { pageNumber, itemsPerPage }) {
    try {
      const page = { number: pageNumber, size: itemsPerPage }
      const resp = await this.$api.findAll('author', {
        page
      })
      commit(mutationTypes.ADD_ITEMS, resp.data)
      commit(mutationTypes.SET_TOTAL, resp.meta.total)
    } catch (e) {
      console.log('ERROR %o', e['0'])
    }
  },
  setPage({ commit }, page) {
    commit(mutationTypes.SET_PAGE, page)
  }
}

export const getters = {
  getAllAuthors: (state) => state.items,
  getTotal: (state) => state.total,
  getPage: (state) => state.page
}
