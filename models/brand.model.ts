import { ImageSourcePropType } from "react-native";

interface Brand {
  _id: string;
  name: string;
  logo: ImageSourcePropType;
}

export default Brand;

export interface Models {
  _id: string;
  brandId: Brand;
  name: string;
}
