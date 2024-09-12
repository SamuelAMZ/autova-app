import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";

// load brands
export async function appSignUp(data: any) {
  const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/user/create`;
  return await axios.post(url, data);
}


export async function changePass(data: any) {
  const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/user/password/change`;
  return await axios.post(url, data);
}

