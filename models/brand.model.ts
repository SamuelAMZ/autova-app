import { ImageSourcePropType } from "react-native";

interface Brand {
  _id: string;
  name: string;
  logo: ImageSourcePropType;
}

export default Brand;

export interface Models {
  _id: string;
  brand: Brand;
  name: string;
}
