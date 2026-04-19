const BASE_URL = 'https://api-task-juliawr-d8d6ara7fygcekdk.polandcentral-01.azurewebsites.net/api';

const api = {
  get: async (url: string) => {
    const res = await fetch(BASE_URL + url);
    return { data: await res.json() };
  },
  post: async (url: string, body: any) => {
    const res = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return { data: await res.json() };
  },
  put: async (url: string, body: any) => {
    const res = await fetch(BASE_URL + url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return { data: await res.json() };
  },
  delete: async (url: string) => {
    await fetch(BASE_URL + url, { method: 'DELETE' });
  }
};

export default api;