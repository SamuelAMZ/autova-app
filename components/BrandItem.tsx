import { PropsWithChildren } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

const BrandItem = ({
  onPress,
  h = 70,
  w = 78,
}: PropsWithChildren & { onPress: () => void; h?: number; w?: number }) => {
  return (
    <View className="flex-1 items-center">
      <TouchableOpacity
        onPress={onPress}
        style={{ height: h, width: w, borderRadius: 70 }}
        className={` border border-[#D0D5DD] justify-center items-center`}
      >
        <Image source={require("@/assets/images/bmw.png")} />
      </TouchableOpacity>
      <ThemedText className="font-semibold">BMW</ThemedText>
    </View>
  );
};

export default BrandItem;
