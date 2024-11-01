import { axiosHttpCommunication } from './axios'
import config from '@/config'

axiosHttpCommunication.configure({
  host: '',
  headers: {}
})

export default axiosHttpCommunication
