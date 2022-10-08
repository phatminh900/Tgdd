import { JWTKEY, LocalStorageKey } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { getUserLocal, removeUserLocal, setUserLocal } from "utils/auth.util";

interface AuthContextProps {
  children: React.ReactNode;
}

export interface IUser {
  email: string;
  name: string;
  _id: string;
  token?: string;
}
export interface IAuthContext {
  user: IUser | null;
  setUserHandler: (user: IUser) => void;
  removeUserHandler: () => void;
}
export const AuthContext = React.createContext<IAuthContext | null>(null);
const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<IUser | null>(getUserLocal() || null);

  const setUserHandler = (user: IUser) => {
    setUserLocal(user);
    setUser(user);
  };
  const removeUserHandler = () => {
    removeUserLocal(LocalStorageKey.AUTH);
    setUser(null);
    Cookies.remove(JWTKEY);
  };
  const context = {
    user,
    setUserHandler,
    removeUserHandler,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
};
export default AuthContextProvider;
