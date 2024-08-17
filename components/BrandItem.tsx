import { PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedText from "./ThemedText";

const BrandItem = ({ children, ...rest }: PropsWithChildren & ViewProps) => {
  return (
    <View className="items-center" {...rest}>
      <View className="h-[55] w-[55] border border-[#D0D5DD] rounded-[36] justify-center items-center">
        <Image
          height={40}
          width={40}
          source={require("@/assets/images/bmw.png")}
        />
      </View>
      <ThemedText className="font-semibold">BMW</ThemedText>
    </View>
  );
};

export default BrandItem;
