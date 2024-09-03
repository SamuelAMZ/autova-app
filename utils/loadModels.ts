import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";

// load brands
export async function loadModels() {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/model`;
    const response: AxiosResponse = await axios.post(url, {});
    return response?.data ?? [];
  } catch (error: any) {
    console.log(error, "error loadModels");
    return [];
  }
}
