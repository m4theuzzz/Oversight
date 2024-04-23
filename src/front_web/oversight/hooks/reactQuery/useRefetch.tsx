import { useQueryClient } from "react-query";

const useRefetchQueries = () => {
  const client = useQueryClient();

  const refetchQueries = (queryKey: string | string[]) =>
    client.refetchQueries(queryKey);

  return refetchQueries;
};

export default useRefetchQueries;
