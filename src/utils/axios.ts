import axios from 'axios'

axios.defaults.baseURL = '/api/'

axios.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${
          localStorage.getItem(import.meta.env.VITE_TOKEN_KEY + '') || ''
        }`,
      },
    }
  },
  (error) => Promise.reject(error)
)

export default axios
