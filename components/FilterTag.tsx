import { View, Text } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedText from "./ThemedText";
import colors from "@/constants/Colors";

const FilterTag = ({
  title,
  active,
  ...rest
}: ViewProps & { title: string; active: boolean }) => {
  return (
    <View
      className={`px-5 h-[40px] rounded-[100] ${
        active ? `bg-[${colors.background}]` : `border border-[${colors.background}]`
      } items-center justify-center `}
      {...rest}
    >
      <ThemedText
        style={{
          fontFamily: active
            ? "SpaceGrotesk_600SemiBold"
            : "SpaceGrotesk_400Regular",
        }}
        className={`${active ? "text-white" : ""}`}
      >
        Discover
      </ThemedText>
    </View>
  );
};

export default FilterTag;
