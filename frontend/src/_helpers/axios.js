//manual https://github.com/axios/axios#installing
const axios = require('axios');
console.log('The base URL is set to its2.herokuapp.com, change it to your local backend if needed')
const apiClient = axios.create({
  baseURL: 'http://localhost:4000'
  //baseURL: 'http://its2.herokuapp.com'
});

apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

export { apiClient };