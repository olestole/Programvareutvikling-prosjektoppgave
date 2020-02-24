// Har problemer med at env-variables ikke loader

export const config = {
  serverUrl: process.env.API_URL //|| 'http://127.0.0.1:8000/api'
};

export default config;
