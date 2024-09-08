import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variable
});

console.log('Env ' + JSON.stringify(process.env));
console.log('URL ' + process.env.REACT_APP_API_BASE_URL);

export default axiosInstance;