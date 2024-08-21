import React, { memo } from "react";
import { View, Text } from "react-native";
import ThemedText from "../ThemedText";
import Colors from "@/constants/Colors";

const Label = ({ text, ...restProps }: { text: number }) => {
  return (
    <View
      className={`items-center py-2 px-4 bg-[${Colors.background}] rounded-[64px]`}
      {...restProps}>
      <ThemedText className="text-[16px] color-white">${text}</ThemedText>
    </View>
  );
};

export default memo(Label);
