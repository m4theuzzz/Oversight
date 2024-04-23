// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "../../hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, guard } = props;

  const auth = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!guard) return

      if (!router.isReady) {
        return;
      }

      if (auth.loading) return;

      if (!auth.user) {
        router.replace({
          pathname: "/login",

        });
      }

      // if(!auth.user.userGroups.includes(schema)){
      //   router.replace({
      //     pathname: '/401'
      //   })
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, auth.user]
  );

  if (!guard) return <>{children}</>;

  if (!auth.user && !router.asPath.includes('login')) {
    return "";
  }

  return <>{children}</>;
};

export default AuthGuard;
