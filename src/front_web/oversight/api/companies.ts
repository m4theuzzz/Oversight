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

export const useCompanyMutations = () => {
  const router = useRouter();
  const client = useQueryClient()

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
          client.refetchQueries(appRoutes.companies)
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
