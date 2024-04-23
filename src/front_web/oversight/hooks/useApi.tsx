// import { useAuth } from 'src/hooks/useAuth'
import axios from "axios";
import { useAuth } from "./useAuth";

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000'

const getApiMethods = (apiToken: string) => {
  const getOptions = (method: string, url: string, data?: any) => {
    let requestEndpoint = url;

    if (url[0] != "h") {
      requestEndpoint = baseUrl + requestEndpoint;
    }

    const options: any = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "session-token": apiToken,
      },
      url: requestEndpoint,
    };

    if (data) {
      if (method != "GET") options.data = data;
      else options.params = data;
    }

    return options;
  };

  const api = {
    get: async (endpoint: string, data?: any) =>
      await axios.request(getOptions("GET", endpoint, data)),
    post: async (data: any, endpoint: string) =>
      await axios.request(getOptions("POST", endpoint, data)),
    delete: async (endpoint: string, data?: any) =>
      await axios.request(getOptions("DELETE", endpoint, data)),
    put: async (data: any, endpoint: string) =>
      await axios.request(getOptions("PUT", endpoint, data)),
    patch: async (data: any, endpoint: string) =>
      await axios.request(getOptions("PATCH", endpoint, data)),
  };

  return api;
};

export const useApi = () => {
  const { user } = useAuth();

  const apiToken = user?.sessionToken ?? "";

  return getApiMethods(apiToken);
};
