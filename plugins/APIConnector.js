import DevourAPI from 'devour-client'

const INJECTED_KEY = 'api'

export default (ctx, inject) => {
  const jsonApi = new DevourAPI({
    apiUrl: process.env.API_URL,
    bearer: process.env.ACCESS_TOKEN
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

  // ctx.$axios.setHeader('Accept', 'application/vnd.api+json')
  // ctx.$axios.setHeader('Content-Type', 'application/vnd.api+json')
  // ctx.$axios.setToken(process.env.ACCESS_TOKEN, 'Bearer')

  jsonApi.axios = ctx.$axios
  ctx[`$${INJECTED_KEY}`] = jsonApi
  inject(INJECTED_KEY, jsonApi)
}
