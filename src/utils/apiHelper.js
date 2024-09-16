// /utils/apiHelper.js
import { getCurrentEnvironment, getFromCookies, removeCookie, clearUserData } from "@/utils/storageHelper";
import { toast } from "react-toastify";

export const updateBlog = async (chatId, blogDataToPublish) => {
  try {
    const response = await fetch(`/api/blog/${chatId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(blogDataToPublish),
    });

    if (!response.ok) {
      throw new Error(`Failed to publish blog: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to publish blog:', error);
    throw error;
  }
};

export const publishBlog = async (blogDataToPublish) => {
  try {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(blogDataToPublish),
    });

    if (!response.ok) {
      throw new Error(`Failed to publish blog: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to publish blog:', error);
    throw error;
  }
};


export const createChat = async () => {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    if(res.status === 401 ) throw new Error('Unauthorised, please login to perform this action')
    throw new Error('Failed to create chat');
  }

  return res.json();
};
export const fetchBlogs = async (userEmail, isUserSpecific) => {
  const queryParam = isUserSpecific ? 'true' : 'false';
  const res = await fetch(`/api/blog?user=${queryParam}&userEmail=${encodeURIComponent(userEmail)}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${isUserSpecific ? 'user' : 'other'} blogs`);
  }

  return res.json();
};


export const getCurrentUser = async () => {
    const baseURL = "https://routes.msg91.com/api"; 
    const endpoint = "/c/getDetails"; 

    const getToken = () => {
        const env = getCurrentEnvironment();
        return (env === 'local') ? localStorage.getItem("proxy_auth_token") : getFromCookies(env);
    };

    try {
        const token = getToken();
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers["proxy_auth_token"] = token;
        }

        const response = await fetch(baseURL + endpoint, {
            method: 'GET',
            headers: headers,
        });

        if (response.status === 401) {
            toast.error('Session Expired');
            removeCookie(getCurrentEnvironment());
            window.location.href = "/";
            return null;
        }

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message);
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching current user details:", error);
        throw error;
    }
};


const getHeaders = () => {
  const env = getCurrentEnvironment();
  const token = getFromCookies(env);
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    const headerKey = env === 'local' ? 'Authorization' : 'proxy_auth_token';
    headers[headerKey] = token;
    headers['token'] = localStorage.getItem('proxy_auth_token');
  }
  
  return headers;
};


export const signUpOnBE = async (data) => {
  const response = await fetch(`api/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const res = await response.json();
  if (res.success) return res;
  if (res.status === 401) {
    toast.error('Session Expired');
    clearUserData();
    window.location.href = '/';
  } else{
    toast.error(res?.message || 'An error occurred');
  }
};