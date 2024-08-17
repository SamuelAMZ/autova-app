import { ImageSourcePropType } from "react-native";

export interface Car {
  img: ImageSourcePropType;
  label: string;
  name: string;
  year: string;
  price: string;
}
