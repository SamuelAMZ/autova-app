import { PropsWithChildren } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

const BrandItem = ({
  onPress,
  size = 70,
}: PropsWithChildren & { onPress: () => void; size: number }) => {
  return (
    <View className="flex-1 items-center">
      <TouchableOpacity
        onPress={onPress}
        style={{ height: size, width: size, borderRadius: 70 }}
        className={` border border-[#D0D5DD] justify-center items-center`}
      >
        <Image source={require("@/assets/images/bmw.png")} />
      </TouchableOpacity>
      <ThemedText className="font-semibold">BMW</ThemedText>
    </View>
  );
};

export default BrandItem;
