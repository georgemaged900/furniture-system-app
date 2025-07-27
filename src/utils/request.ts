import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { store } from "../store";
import { logoutAction } from "../reducers/authReducer";
import { setGeneralAlertMessage } from "../reducers/generalReducer";

// Set the base URL for your API
export const API_URL = process.env.REACT_APP_API_URL; // Ensure this is defined in your environment

const apiClient = axios.create({
  baseURL: API_URL
});

// Custom error class for better error handling
class APIError extends Error {
  public status: number | undefined;
  public data: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// Generic error handler
const handleRequestError = (error: AxiosError<any>) => {
  const errorMessage = error.response?.data?.message || "An unexpected error occurred";
  const errorStatus = error.response?.status;
  const errorData = error.response?.data || null;

  throw new APIError(errorMessage, errorStatus, errorData);
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      store.dispatch(logoutAction());
      store.dispatch(setGeneralAlertMessage({ type: "error", message: "Session timed out!" }));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to make GET requests
export const _getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error: any) {
    handleRequestError(error);
    throw error;
  }
};

// Function to make POST requests
export const _postRequest = async <T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    handleRequestError(error);
     throw error;
  }
};

// Function to make PUT requests
export const _putRequest = async <T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    handleRequestError(error);
    throw  error;
  }
};

// Function to make DELETE requests
export const _deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  } catch (error: any) {
    handleRequestError(error);
    throw error;
  }
};
