import { LOCAL_STORAGE_KEYS } from "./constant";

export const getStorageValue = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
  }
  return null;
};

export const removeStorageValue = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
  }
};
