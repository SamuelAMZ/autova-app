import { View, Text } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";

const FilterTag = ({
  title,
  active,
  ...rest
}: ViewProps & { title: string; active: boolean }) => {
  return (
    <View
      className={`px-5 h-[40px] rounded-[100] ${
        active ? `bg-[${Colors.background}]` : `border border-[${Colors.background}]`
      } items-center justify-center `}
      {...rest}
    >
      <ThemedText
        style={{
          fontFamily: active
            ? "SpaceGrotesk_600SemiBold"
            : "SpaceGrotesk_400Regular",
        }}
        className={`${active ? Colors.textPrimary : ""}`}
      >
        Discover
      </ThemedText>
    </View>
  );
};

export default FilterTag;
