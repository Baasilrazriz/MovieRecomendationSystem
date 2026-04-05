/**
 * API Service Layer - Centralized API configuration and calls
 * Environment-based with proper error handling and request management
 */

import axios from 'axios';

// API Base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================
export const authAPI = {
  login: (username, password) =>
    apiClient.post('/api/login', { username, password }),

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  },

  isAuthenticated: () => !!localStorage.getItem('auth_token'),

  getToken: () => localStorage.getItem('auth_token'),
};

// ==================== MOVIE APIs ====================
export const movieAPI = {
  // Get top rated movies
  getTopRated: (limit = 10) =>
    apiClient.get('/api/top-rated'),

  // Get recommendations by movie name
  getRecommendationsByName: (movieName) =>
    apiClient.get(`/api/recommend?movie_name=${encodeURIComponent(movieName)}`),

  // Get all movie categories
  getCategories: () =>
    apiClient.get('/api/categories'),

  // Get movies by category
  getByCategory: (category) =>
    apiClient.get(`/api/filter?category=${encodeURIComponent(category)}`),

  // Search movies by title
  searchMovies: (query) =>
    apiClient.get(`/api/search?q=${encodeURIComponent(query)}`),

  // Get recommendations for multiple categories in parallel
  getMultipleCategories: async (categories) => {
    if (!categories || categories.length === 0) {
      return {};
    }

    try {
      // Use Promise.all for parallel requests (NOT sequential!)
      const requests = categories.map((category) =>
        apiClient
          .get(`/api/filter?category=${encodeURIComponent(category)}`)
          .then((res) => ({ category, data: res.data }))
          .catch((err) => ({ category, data: null, error: err }))
      );

      const results = await Promise.all(requests);

      // Transform into object: { category: movies }
      const moviesByCategory = {};
      results.forEach(({ category, data }) => {
        moviesByCategory[category] = data || {};
      });

      return moviesByCategory;
    } catch (error) {
      console.error('Error fetching multiple categories:', error);
      throw error;
    }
  },
};

// ==================== CACHE UTILITY ====================
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

export const cacheAPI = {
  set: (key, value, expiryMinutes = 30) => {
    try {
      const cacheItem = {
        value,
        timestamp: Date.now(),
        expiry: expiryMinutes * 60 * 1000,
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
    } catch (e) {
      console.warn('Cache set failed:', e);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;

      const { value, timestamp, expiry } = JSON.parse(item);

      // Check if cache has expired
      if (Date.now() - timestamp > expiry) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return value;
    } catch (e) {
      console.warn('Cache get failed:', e);
      return null;
    }
  },

  clear: (key) => {
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (e) {
      console.warn('Cache clear failed:', e);
    }
  },

  clearAll: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn('Cache clearAll failed:', e);
    }
  },
};

// ==================== REQUEST HELPERS ====================
export const fetchWithCache = async (cacheKey, fetchFn, expiryMinutes = 30) => {
  // Try cache first
  const cached = cacheAPI.get(cacheKey);
  if (cached) {
    return cached;
  }

  // If not cached, fetch
  const data = await fetchFn();

  // Cache the result
  cacheAPI.set(cacheKey, data, expiryMinutes);

  return data;
};

// ==================== UTILITY ====================
export const getAPIBaseURL = () => API_BASE_URL;

export default apiClient;
