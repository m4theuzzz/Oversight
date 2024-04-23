import { appRoutes } from "../routes";
import { useFetchData } from "../utils/reactQuery";

export const useGetServices = () => {
  return useFetchData(appRoutes.services);
};

export const useGetService = (serviceId) => {
  return useFetchData(appRoutes.serviceById, { serviceId });
};
