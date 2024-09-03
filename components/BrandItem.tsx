import { PropsWithChildren } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

type BrandType = {
  name: string;
  logo: string;
  _id?: string;
};

const BrandItem = ({
  onPress,
  size = 70,
  brand,
}: PropsWithChildren & {
  onPress: () => void;
  size: number;
  brand: BrandType;
}) => {
  console.log(brand, "brand");
  return (
    <View className="flex items-center">
      <TouchableOpacity
        onPress={onPress}
        style={{ height: size, width: size, borderRadius: 70 }}
        className={` border border-[#D0D5DD] flex justify-center items-center`}
      >
        <Image
          source={
            brand?.logo
              ? { uri: brand.logo }
              : require("@/assets/images/bmw.png")
          }
          style={{
            height: 45,
            width: 45,
          }}
        />
      </TouchableOpacity>
      <ThemedText className="font-semibold">{brand?.name}</ThemedText>
    </View>
  );
};

export default BrandItem;
