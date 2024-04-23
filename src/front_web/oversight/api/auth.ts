import { appRoutes } from "../routes";
import { useMultimethodMutation } from "../utils/reactQuery";

export const useLogin = () => {
  const loginMutation = useMultimethodMutation(appRoutes.login);

  const handleLogin = (loginData, successCallback) => {
    loginMutation.mutate(
      { method: "POST", data: loginData },
      {
        onSuccess: (data) =>
          successCallback({
            ...data.data.user,
            sessionToken: data.data.sessionToken,
          }),
        onError: () => {},
      }
    );
  };

  return { handleLogin };
};
