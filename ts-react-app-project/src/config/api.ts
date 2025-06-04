// В режиме разработки используем локальный API, в продакшене - Render
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://questsapi.onrender.com'
  : 'http://localhost:3000';

export { API_BASE_URL }; 