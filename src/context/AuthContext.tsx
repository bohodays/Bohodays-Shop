import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";
import { userType } from "../types/user-type";

export type authContextType =
  | {
      user?: userType | null;
      uid?: string | null;
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
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): authContextType {
  return useContext(AuthContext);
}
