//manual https://github.com/axios/axios#installing
const axios = require('axios');
console.log('The base URL is set to its2.herokuapp.com, change it to your local backend if needed')
const apiClient = axios.create({
  // baseURL: 'http://its2.herokuapp.com'
  baseURL: 'http://localhost:4000'
});
//Send authorization token with every backend request if the token exists
if (localStorage.token) {
	apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
}
export { apiClient };