import Brand, { Models } from "@/models/brand.model";

export interface RangeProps {
  low: number;
  high: number;
}

export interface ItemDataProps {
  name: string;
  _id: string;
}

export interface selectedTypeProps {
  type: string;
  data: ItemDataProps[];
}

export interface FilterDataProps {
  selectedMake: ItemDataProps | undefined;
  selectedModel: ItemDataProps | undefined;
  selectedTransmission: ItemDataProps | undefined;
  selectedEngineType: ItemDataProps | undefined;
  rangeValue: RangeProps;
}
export interface requestExtrasProps {
  key: string;
  value: string;
}

export interface requestProps {
  data: any;
  url: string;
  isFileUpload?: boolean;
  extras?: requestExtrasProps[];
}

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  phone: string;
  createdAt: string;
}

export interface makedModelsProps {
  makes: Brand[];
  models: Models[];
}

export type makeModalSearchProps = {
  models: any[];
  makes: any[];
};
