//manual https://github.com/axios/axios#installing
const axios = require('axios');
const apiClient = axios.create({
  baseURL: 'http://its2.herokuapp.com'
});
if (localStorage.userToken) {
	apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.userToken;
}
export { apiClient };