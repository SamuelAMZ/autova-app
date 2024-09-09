import { ImageSourcePropType } from "react-native";

interface Car {
  _id: string;
  imagesUrls: Array<ImageSourcePropType>;
  name: string;
  year: string;
  price: string;
  countryId: {
    name: string;
  };
  cityId: {
    name: string;
  };
}

export default Car;
