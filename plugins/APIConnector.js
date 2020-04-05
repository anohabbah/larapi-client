import DevourAPI from 'devour-client'

const INJECTED_KEY = 'api'

export default (ctx, inject) => {
  const jsonApi = new DevourAPI({
    apiUrl: process.env.API_URL
  })

  // console.log(process.env.ACCESS_TOKEN)

  jsonApi.define('author', {
    name: '',
    created_at: '',
    updated_at: '',
    books: {
      jsonApi: 'hasMany',
      type: 'books'
    }
  })

  jsonApi.define('book', {
    title: '',
    description: '',
    publication_year: '',
    created_at: '',
    updated_at: '',
    authors: {
      jsonApi: 'hasMany',
      type: 'authors'
    },
    comments: {
      jsonApi: 'hasMany',
      type: 'comments'
    }
  })

  jsonApi.axios = ctx.$axios
  ctx[`$${INJECTED_KEY}`] = jsonApi
  inject(INJECTED_KEY, jsonApi)
}
