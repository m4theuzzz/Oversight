import { useQuery } from "react-query";
import { appRoutes } from "../routes";
import { useFetchData } from "../utils/reactQuery";

export const useGetBudgets = () => {
  return useFetchData(appRoutes.budgets);
};

export const useGetBudget = (budgetId: number) => {
  return useFetchData(appRoutes.budgetById, { budgetId });
};

export const useGetBudgetServices = (budgetId: number) => {
  return useFetchData(appRoutes.budgetServices, { budgetId });
};
