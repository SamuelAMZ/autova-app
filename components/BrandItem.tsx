import { PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const BrandItem = ({ children, ...rest }: PropsWithChildren & ViewProps) => {
  return (
    <View className="items-center" {...rest}>
      <View className="h-[65] w-[65] border border-[#D0D5DD] rounded-[36] justify-center items-center">
        <Image source={require("@/assets/images/bmw.png")} />
      </View>
      <Text className="mt-1 font-semibold">BMW</Text>
    </View>
  );
};

export default BrandItem;
