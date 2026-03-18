import axios from 'axios'

export const securedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {},
})

securedAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_MOVIE_API_KEY}`
  return config
})

securedAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Mirror existing behavior: log + reject unless 401 special-case is needed later.
    // eslint-disable-next-line no-console
    console.log(error)
    if (error?.response?.status === 401) {
      // noop for now (Vue version has token removal commented out)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

