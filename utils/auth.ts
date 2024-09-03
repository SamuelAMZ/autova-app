import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";

// load brands
export async function signUp() {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOIN}/user/create`;
    const response: AxiosResponse = await axios.post(url, {});
    console.log(response);
    return response?.data ?? [];
  } catch (error: any) {
    console.log(error, "error signin up");
    return [];
  }
}
