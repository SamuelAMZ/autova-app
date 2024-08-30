import { PropsWithChildren } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

type BrandType = {
  title: string;
  image: string;
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
  return (
    <View className="flex-1 items-center">
      <TouchableOpacity
        onPress={onPress}
        style={{ height: size, width: size, borderRadius: 70 }}
        className={` border border-[#D0D5DD] flex justify-center items-center`}
      >
        <Image
          source={
            brand?.image
              ? { uri: brand.image }
              : require("@/assets/images/bmw.png")
          }
          style={{
            height: 45,
            width: 45,
          }}
        />
      </TouchableOpacity>
      <ThemedText className="font-semibold">{brand?.title}</ThemedText>
    </View>
  );
};

export default BrandItem;
