import { PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedText from "./ThemedText";

const BrandItem = ({ children, ...rest }: PropsWithChildren & ViewProps) => {
  return (
    <View className="items-center flex gap-[8px]" {...rest}>
      <View className="h-[72px] w-[72px] border border-[#D0D5DD] rounded-[36] justify-center items-center">
        <Image
          height={32}
          width={32}
          source={require("@/assets/images/bmw.png")}
        />
      </View>
      <ThemedText className="font-semibold">BMW</ThemedText>
    </View>
  );
};

export default BrandItem;
