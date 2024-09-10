import { ImageSourcePropType } from "react-native";

interface Car {
  _id: string;
  imagesUrls: Array<ImageSourcePropType>;
  name: string;
  year: string;
  price: string;
  country: {
    name: string;
  };
  city: {
    name: string;
  };
  odometer: string;
  salesPrice: string;
  updatedAt: string;
  createdAt: string;
}

export default Car;
