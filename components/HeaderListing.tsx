import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as Progress from "react-native-progress";

const HeaderListing = ({
  children,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        className="flex flex-col justify-between items-center bg-[#fff] p-[16px] min-h-[100]"
        style={{ paddingTop: insets.top + 5, paddingBottom: 15 }}
        {...rest}>
        <StatusBar style="dark" translucent />
        {children}
      </View>
      <Progress.Bar
        progress={0.25}
        height={2}
        color="#5856D6"
        width={null}
        borderRadius={0}
        borderWidth={0}
        unfilledColor="#878b93"
      />
    </>
  );
};

export default HeaderListing;
