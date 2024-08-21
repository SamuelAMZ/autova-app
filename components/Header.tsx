import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import colors from "@/constants/Colors";

const Header = ({
  children,
  className,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`bg-[${colors.background}] ${className}`}
      style={{ paddingTop: insets.top }}
      {...rest}
    >
      <StatusBar style="light" translucent />
      {children}
    </View>
  );
};

export default Header;
