import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../hooks/useApi";
import { pathToUrl } from "./routerCompile";

export const useFetchData = (
  endpoint: string,
  params?: object,
  config?: any,
  data?: any,
  customQueryKey?: string
) => {
  const api = useApi();

  const url = pathToUrl(endpoint, { ...params });

  const queryKey = customQueryKey
    ? customQueryKey
    : !!data
      ? [url, data]
      : [url];

  return useQuery([...queryKey], () => api.get(url, data), {
    enabled: !!endpoint,
    keepPreviousData: true,
    onError: () => {
      return { status: 500, message: `There's nothing else to see here` };
    },
    ...config,
  });
};


type MultimethodMutation<T> = {
  data?: any
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET'
  params?: T | object
}

export const useMultimethodMutation = <T extends object>(
  endpointBase: string,
  defaultParams: object = {},
  invalidateEndpoint?: string
) => {
  const client = useQueryClient()
  const api = useApi()
  const invalidateUrl = invalidateEndpoint ? pathToUrl(invalidateEndpoint, { ...defaultParams }) : ''

  return useMutation({
    mutationFn: ({ data, params = {}, method }: MultimethodMutation<T>) => {
      const endpoint = pathToUrl(endpointBase, { ...defaultParams, ...params })

      if (method == 'PUT') {
        return api.put(data, endpoint)
      }

      if (method == 'DELETE') {
        return api.delete(endpoint, data)
      }

      if (method == 'PATCH') {
        return api.patch(data, endpoint)
      }

      if (method == 'GET') {
        return api.get(endpoint)
      }

      return api.post(data, endpoint)
    },

    onSuccess: () => {
      !!invalidateUrl && client.refetchQueries(invalidateUrl)
    }
  })
}
