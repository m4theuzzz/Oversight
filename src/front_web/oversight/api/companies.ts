import { useRouter } from "next/router";
import { appRoutes } from "../routes";
import { useFetchData, useMultimethodMutation } from "../utils/reactQuery";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { pathToUrl } from "../utils/routerCompile";

export const useGetCompanies = () => {
  return useFetchData(appRoutes.companies);
};

export const useGetCompany = (companyId: number) => {
  return useFetchData(appRoutes.companyById, { companyId });
};

export const useGetService = (serviceId: number) => {
  return useFetchData(appRoutes.serviceById, { serviceId });
};

export const useGetCostumer = (costumerId: number) => {
  console.log("%cXABLAU", "color: blue", costumerId);
  return useFetchData(appRoutes.costumerById, { costumerId });
};

export const useCostumerMutations = () => {
  const router = useRouter();
  const client = useQueryClient();

  const costumerMutation = useMultimethodMutation(appRoutes.costumers);
  const costumerByIdMutation = useMultimethodMutation(appRoutes.costumerById);

  const addCostumer = (data) => {
    costumerMutation.mutate(
      { data, method: "POST" },
      {
        onSuccess: () => {
          toast.success("Cliente criado com sucesso");
          router.push("/costumers");
        },
        onError: () => {
          toast.error("Erro ao criar cliente");
        },
      }
    );
  };

  const editCostumer = (data, id) => {
    costumerByIdMutation.mutate(
      { data, method: "PUT", params: { costumerId: id } },
      {
        onSuccess: () => {
          toast.success("Cliente salva com sucesso");
          router.push("/costumers");
        },
        onError: () => {
          toast.error("Erro ao salvar cliente");
        },
      }
    );
  };

  const deleteCostumer = (id) => {
    costumerByIdMutation.mutate(
      { method: "DELETE", params: { costumerId: id } },
      {
        onSuccess: () => {
          toast.success("Cliente excluída com sucesso");
          client.refetchQueries(appRoutes.costumers);
        },
        onError: () => {
          toast.error("Erro ao excluir cliente");
        },
      }
    );
  };

  const isLoading =
    costumerMutation.isLoading || costumerByIdMutation.isLoading;

  return { addCostumer, editCostumer, deleteCostumer, isLoading };
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
          toast.error("Erro ao excluir serviço");
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
  const serviceBudgetMutation = useMultimethodMutation(
    appRoutes.budgetServices
  );

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

  const addServiceToBudget = ({
    serviceId,
    quantity,
    budgetedUnitValue,
    budgetId,
    callback,
  }) => {
    serviceBudgetMutation.mutate(
      {
        method: "POST",
        params: { budgetId: budgetId },
        data: { serviceId, quantity, budgetedUnitValue },
      },
      {
        onSuccess: () => {
          toast.success("Serviço adicionado com sucesso");
          client.refetchQueries(
            pathToUrl(appRoutes.budgetServices, { budgetId })
          );
          callback();
        },
        onError: () => {
          toast.error("Erro ao adicionar serviço");
        },
      }
    );
  };

  const isLoading = budgetMutation.isLoading || budgetByIdMutation.isLoading;

  return { addBudget, editBudget, deleteBudget, isLoading, addServiceToBudget };
};
