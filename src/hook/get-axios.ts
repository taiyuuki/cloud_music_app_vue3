import axios from 'axios'

export default function () {
  axios.defaults.baseURL = `http://localhost:3000`; //设置默认url
  return axios;
}