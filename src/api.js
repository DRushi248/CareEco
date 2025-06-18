import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mockapi.io/api', // You can replace this with real or mock server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
