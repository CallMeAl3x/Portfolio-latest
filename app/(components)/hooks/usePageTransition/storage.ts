import { LOCAL_STORAGE_KEYS } from "./constant";

export const getStorageValue = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
};

export const removeStorageValue = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
};
