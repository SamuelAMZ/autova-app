import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";

// load brands
export async function loadTitles() {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/title`;
    const response: AxiosResponse = await axios.post(url, {});
    return response?.data ?? [];
  } catch (error: any) {
    console.log(error, "error loadBrands");
    return [];
  }
}
