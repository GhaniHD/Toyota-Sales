// utils/imageUrl.js
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url; // URL absolut (Unsplash, dll)
  return `${BASE_URL}${url}`; // path relatif: /uploads/...
};