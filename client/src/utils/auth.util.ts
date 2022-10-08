import { JWTKEY, LocalStorageKey } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";
import { removeItem, setItem } from "./browser-storage.util";
const getUserLocal = () => {
  const data = localStorage.getItem(LocalStorageKey.AUTH);
  if (!data) return null;
  return JSON.parse(data);
};
const setUserLocal = (data: any) => {
  setItem(LocalStorageKey.AUTH, data);
};
const removeUserLocal = (key: string) => {
  removeItem(key);
};
const setAuthorizationHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { getUserLocal, setUserLocal, removeUserLocal, setAuthorizationHeader };
