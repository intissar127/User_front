// Crée un fichier src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api'
});

api.interceptors.request.use(async (config) => {
  let token = sessionStorage.getItem('token');
  const expiresAt = sessionStorage.getItem('expires_at');

  // Si le token expire dans moins de 30 secondes, on refresh
  if (token && Date.now() > (expiresAt - 30000)) {
    try {
      const refreshToken = sessionStorage.getItem('refresh_token');
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('client_id', 'soutenancia-frontend');
      params.append('refresh_token', refreshToken);

      const res = await axios.post('http://localhost:8180/realms/soutenancia/protocol/openid-connect/token', params);
      
      token = res.data.access_token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('expires_at', Date.now() + (res.data.expires_in * 1000));
    } catch{
      sessionStorage.clear();
      window.location.href = '/login';
    }
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;