import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with deployed URL if hosting backend
  headers: { 'Content-Type': 'application/json' },
});

export default API;
