import { appRoutes } from "../routes";
import { useFetchData } from "../utils/reactQuery";

export const useGetCostumers = () => {
    return useFetchData(appRoutes.costumers);
  };