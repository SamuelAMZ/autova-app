import axios, { AxiosResponse, AxiosError } from "axios";
import { ENV } from "@/constants/env";
import { FilterDataProps } from "@/constants/types";

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

// load brands
export async function filterCars(data: FilterDataProps) {
  try {
    console.log(data);
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/car/filter`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error loadCars");
    return [];
  }
}
