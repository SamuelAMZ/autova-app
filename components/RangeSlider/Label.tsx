import React, { memo } from "react";
import { View, Text } from "react-native";

const Label = ({ text, ...restProps }: { text: number }) => {
  return (
    <View
      className="items-center py-2 px-4 bg-[#5856D6] rounded-[64px]"
      {...restProps}
    >
      <Text className="text-[16px] color-white">${text}</Text>
    </View>
  );
};

export default memo(Label);
