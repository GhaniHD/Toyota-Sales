import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  // Tidak menetapkan Content-Type secara manual agar FormData bekerja
});

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Debug
  if (token && config.url !== '/admin/login') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login Admin
export const loginAdmin = async (username, password) => {
  try {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login gagal';
  }
};

// Websites
export const getWebsites = async (domain = '') => {
  try {
    const response = await api.get('/websites', { params: { domain } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data website';
  }
};

export const createWebsite = async (data) => {
  try {
    const response = await api.post('/websites', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat website';
  }
};

export const updateWebsite = async (id, data) => {
  try {
    const response = await api.put(`/websites/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui website';
  }
};

export const deleteWebsite = async (id) => {
  try {
    const response = await api.delete(`/websites/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus website';
  }
};

// Sales Info
export const getSalesInfo = async (website_id = '') => {
  try {
    const response = await api.get('/sales_info', { params: { website_id } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data sales info';
  }
};

export const createSalesInfo = async (data) => {
  try {
    const response = await api.post('/sales_info', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat sales info';
  }
};

export const updateSalesInfo = async (id, data) => {
  try {
    const response = await api.put(`/sales_info/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui sales info';
  }
};

export const deleteSalesInfo = async (id) => {
  try {
    const response = await api.delete(`/sales_info/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus sales info';
  }
};

// Cars
export const getCars = async (website_id = '', slug = '') => {
  try {
    const response = await api.get('/cars', { params: { website_id, slug } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data mobil';
  }
};

export const createCar = async (data) => {
  try {
    const response = await api.post('/cars', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat mobil';
  }
};

export const updateCar = async (id, data) => {
  try {
    const response = await api.put(`/cars/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui mobil';
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus mobil';
  }
};

// Testimonials
export const getTestimonials = async (website_id = '') => {
  try {
    const response = await api.get('/testimonials', { params: { website_id } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data testimonial';
  }
};

export const createTestimonial = async (data) => {
  try {
    const response = await api.post('/testimonials', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat testimonial';
  }
};

export const updateTestimonial = async (id, data) => {
  try {
    const response = await api.put(`/testimonials/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui testimonial';
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus testimonial';
  }
};

// FAQs
export const getFaqs = async (website_id = '') => {
  try {
    const response = await api.get('/faqs', { params: { website_id } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data FAQ';
  }
};

export const createFaq = async (data) => {
  try {
    const response = await api.post('/faqs', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat FAQ';
  }
};

export const updateFaq = async (id, data) => {
  try {
    const response = await api.put(`/faqs/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui FAQ';
  }
};

export const deleteFaq = async (id) => {
  try {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus FAQ';
  }
};

// Admins
export const getAdmins = async () => {
  try {
    const response = await api.get('/admins');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal mengambil data admin';
  }
};

export const createAdmin = async (data) => {
  try {
    const response = await api.post('/admins', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal membuat admin';
  }
};

export const updateAdmin = async (id, data) => {
  try {
    const response = await api.put(`/admins/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal memperbarui admin';
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await api.delete(`/admins/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Gagal menghapus admin';
  }
};