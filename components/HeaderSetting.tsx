import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const HeaderSetting = ({
  children,
  className,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`bg-[#fff] ${className}`}
      style={{ paddingTop: insets.top }}
      {...rest}
    >
      <StatusBar style="dark" translucent />
      {children}
    </View>
  );
};

export default HeaderSetting;
