// authProvider.tsx
import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./context";
import { setAuthorizationHeader } from "../../api/client"
<source />

interface Props {
  defaultIsLogged: boolean;
  children: ReactNode;
}

export function AuthProvider({ defaultIsLogged, children }: Props) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      setIsLogged(true);
      setAuthorizationHeader(token);
    }
  }, []);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
