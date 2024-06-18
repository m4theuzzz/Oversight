import { useRouter } from "next/router";
import { appRoutes } from "../routes";
import { useFetchData, useMultimethodMutation } from "../utils/reactQuery";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";

export const useGetCompanies = () => {
  return useFetchData(appRoutes.companies);
};

export const useGetCompany = (companyId: number) => {
  return useFetchData(appRoutes.companyById, { companyId });
};

export const useGetService = (serviceId: number) => {
  return useFetchData(appRoutes.serviceById, { serviceId });
};

export const useServiceMutations = () => {
  const router = useRouter();
  const client = useQueryClient();

  const serviceMutation = useMultimethodMutation(appRoutes.services);
  const serviceByIdMutation = useMultimethodMutation(appRoutes.serviceById);

  const addService = (data) => {
    serviceMutation.mutate(
      { data, method: "POST" },
      {
        onSuccess: () => {
          toast.success("Serviço criado com sucesso");
          router.push("/services");
        },
        onError: () => {
          toast.error("Erro ao criar serviço");
        },
      }
    );
  };

  const editService = (data, id) => {
    serviceByIdMutation.mutate(
      { data, method: "PUT", params: { serviceId: id } },
      {
        onSuccess: () => {
          toast.success("Serviço salva com sucesso");
          router.push("/services");
        },
        onError: () => {
          toast.error("Erro ao salvar serviço");
        },
      }
    );
  };

  const deleteService = (id) => {
    serviceByIdMutation.mutate(
      { method: "DELETE", params: { serviceId: id } },
      {
        onSuccess: () => {
          toast.success("Serviço excluída com sucesso");
          client.refetchQueries(appRoutes.services);
        },
        onError: () => {
          toast.error("Erro ao excluir empresa");
        },
      }
    );
  };

  const isLoading = serviceMutation.isLoading || serviceByIdMutation.isLoading;

  return { addService, editService, deleteService, isLoading };
};

export const useCompanyMutations = () => {
  const router = useRouter();
  const client = useQueryClient();

  const companyMutation = useMultimethodMutation(appRoutes.companies);
  const companyByIdMutation = useMultimethodMutation(appRoutes.companyById);

  const addCompany = (data) => {
    companyMutation.mutate(
      { data, method: "POST" },
      {
        onSuccess: () => {
          toast.success("Empresa criada com sucesso");
          router.push("/companies");
        },
        onError: () => {
          toast.error("Erro ao criar empresa");
        },
      }
    );
  };

  const editCompany = (data, id) => {
    companyByIdMutation.mutate(
      { data, method: "PUT", params: { companyId: id } },
      {
        onSuccess: () => {
          toast.success("Empresa salva com sucesso");
          router.push("/companies");
        },
        onError: () => {
          toast.error("Erro ao salvar empresa");
        },
      }
    );
  };

  const deleteCompany = (id) => {
    companyByIdMutation.mutate(
      { method: "DELETE", params: { companyId: id } },
      {
        onSuccess: () => {
          toast.success("Empresa excluída com sucesso");
          client.refetchQueries(appRoutes.companies);
        },
        onError: () => {
          toast.error("Erro ao excluir empresa");
        },
      }
    );
  };

  const isLoading = companyMutation.isLoading || companyByIdMutation.isLoading;

  return { addCompany, editCompany, deleteCompany, isLoading };
};

export const useBudgetMutation = () => {
  const router = useRouter();
  const client = useQueryClient();

  const budgetMutation = useMultimethodMutation(appRoutes.budgets);
  const budgetByIdMutation = useMultimethodMutation(appRoutes.budgetById);

  const addBudget = (data) => {
    budgetMutation.mutate(
      { data, method: "POST" },
      {
        onSuccess: () => {
          toast.success("Orçamento criada com sucesso");
          router.push("/budgets");
        },
        onError: () => {
          toast.error("Erro ao criar orçamento");
        },
      }
    );
  };

  const editBudget = (data, id) => {
    budgetByIdMutation.mutate(
      { data, method: "PUT", params: { budgetId: id } },
      {
        onSuccess: () => {
          toast.success("Orçamento salva com sucesso");
          router.push("/budgets");
        },
        onError: () => {
          toast.error("Erro ao salvar orçamento");
        },
      }
    );
  };

  const deleteBudget = (id) => {
    budgetByIdMutation.mutate(
      { method: "DELETE", params: { budgetId: id } },
      {
        onSuccess: () => {
          toast.success("Orçamento excluído com sucesso");
          client.refetchQueries(appRoutes.budgets);
        },
        onError: () => {
          toast.error("Erro ao excluir orçamento");
        },
      }
    );
  };

  const isLoading = budgetMutation.isLoading || budgetByIdMutation.isLoading;

  return { addBudget, editBudget, deleteBudget, isLoading };
};
