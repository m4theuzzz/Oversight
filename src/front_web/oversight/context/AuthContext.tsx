import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLogin } from "../api/auth";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children, guard }) => {
  // ** States
  const { storedValue: userStored, setValue: storeUser } =
    useLocalStorage("user");
  const [user, setUser] = useState();

  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { handleLogin } = useLogin();

  const redirectTo = (destination: string) => {
    guard && router.replace({
      pathname: destination,
    });
  };

  const redirectToAsync = async (destination: string, callback: () => void) => {
    await router.push({
      pathname: destination,
    });

    callback();
  };

  const initAuth = () => {
    if (userStored) {
      setUser(userStored);
      setLoading(false);
      return;
    }

    redirectTo("/login");
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (loginInfo: LoginParams) => {
    setLoading(true);

    const onLoginSuccess = (userData) => {
      setUser(userData);
      storeUser(userData);
      setLoading(false);
      redirectTo("/");
    };

    handleLogin(loginInfo, onLoginSuccess);

    //   try {
    //     const userSignIn = await Auth.signIn(loginInfo.user, loginInfo.password)
    //     const userGroups = userSignIn.signInUserSession.idToken.payload['cognito:groups']

    //     setUser(p => ({ ...p, userGroups }))

    //     return userGroups as string[]
    //   } catch (err) {
    //     toast.error('Erro no login' + err)
    //     setLoading(false)
    //   }
  };

  const logout = async () => {
    try {
      setUser(null);
      storeUser(null);

      router.push("/login");
    } catch (error) { }
  };

  const values = {
    user,
    loading,
    setUser,

    setLoading,

    logout,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
