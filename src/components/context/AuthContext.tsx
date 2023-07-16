import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, onUserStateChange } from "../../api/firebase";
import { userType } from "../../types/user-type";

type authContextType =
  | {
      user?: userType | null;
      login?: () => void;
      logout?: () => void;
    }
  | undefined;

const AuthContext = createContext<authContextType>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<userType>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
