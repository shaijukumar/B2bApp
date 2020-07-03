import * as SecureStore from "expo-secure-store";

//export default async function() {
export const getToken = async () => {
  let key = await SecureStore.getItemAsync("jttToken");
  return key;
};

export const setToken = async (token) => {
  await SecureStore.setItemAsync("jttToken", token);
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync("jttToken");
};

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));
