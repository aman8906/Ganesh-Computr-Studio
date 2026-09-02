import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  timeout: 10000,
});

export const submitEnquiry = (payload) => api.post('/enquiries', payload);
export const fetchServices = () => api.get('/services');
export const fetchServiceBySlug = (slug) => api.get(`/services/${slug}`);
export const adminLogin = (credentials) => api.post('/auth/login', credentials);
export const fetchAdminEnquiries = (params) => api.get('/admin/enquiries', { params });
export const updateEnquiryStatus = (id, status) => api.patch(`/admin/enquiries/${id}`, { status });

export default api;
