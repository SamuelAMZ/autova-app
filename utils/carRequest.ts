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

// export async function loadCars({
//   page = 1,
//   perPage = 10,
// }: {
//   page: number;
//   perPage: number;
// }) {
//   try {
//     const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/car`;
//     const response: AxiosResponse = await axios.post(url, { page, perPage });
//     return response?.data ?? [];
//   } catch (error: any) {
//     console.error(error, "error loadCars");
//     return [];
//   }
// }

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

interface savedCarRequestProps {
  carsId: Array<string>;
  userId: string;
}
export async function savedCar(data: savedCarRequestProps) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/saved_cars/create`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error savedCar");
    return [];
  }
}

export async function getSavedCar({
  userId,
  expand = false,
}: {
  userId: string;
  expand?: boolean;
}) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/saved_cars/get`;
    const response: AxiosResponse = await axios.post(url, { userId, expand });
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error savedCar");
    return [];
  }
}

export async function saveSingleCar(data: { carId: string; userId: string }) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/saved_cars/save-single`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error savedCar");
    return [];
  }
}

export async function unSaveSingleCar(data: { carId: string; userId: string }) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/saved_cars/unsave-single`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error savedCar");
    return [];
  }
}

export async function isCarSaved(data: { carId: string; userId: string }) {
  try {
    const url = `${ENV.EXPO_PUBLIC_BACKEND_ENDPOINT}/saved_cars/check`;
    const response: AxiosResponse = await axios.post(url, data);
    return response?.data ?? [];
  } catch (error: any) {
    console.error(error, "error savedCar");
    return [];
  }
}
