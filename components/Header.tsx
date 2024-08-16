import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const Header = ({ children, ...rest }: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex flex-col justify-between items-center bg-[#5856D6] p-[16px] min-h-[126]"
      style={{ paddingTop: insets.top, paddingBottom: 15 }}
      {...rest}
    >
      <StatusBar style="light" translucent />
      {children}
    </View>
  );
};

export default Header;
