import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";

// load brands
export async function loadCars() {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/car`;
    const response: AxiosResponse = await axios.post(url, {});
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error loadCars");
    return [];
  }
}

interface getRequestProps {
  id: string;
}

export async function getCarById(data: getRequestProps) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/car/get`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error loadCars");
    return [];
  }
}
