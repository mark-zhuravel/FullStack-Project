// В режиме разработки используем локальный API, в продакшене - Render
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://questsapi.onrender.com/api'
  : 'http://localhost:3000/api';

export { API_BASE_URL }; 