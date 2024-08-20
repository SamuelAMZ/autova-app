import { View, Text } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import ThemedText from "./ThemedText";

const FilterTag = ({
  title,
  active,
  ...rest
}: ViewProps & { title: string; active: boolean }) => {
  return (
    <View
      className={`px-5 h-[40px] rounded-[100] ${
        active ? "bg-[#5856D6]" : "border border-[#5856D6]"
      } items-center justify-center `}
      {...rest}
    >
      <ThemedText
        style={{
          fontFamily: active ? "Poppins_600SemiBold" : "Poppins_400Regular",
        }}
        className={`${active ? "text-white" : ""}`}
      >
        Discover
      </ThemedText>
    </View>
  );
};

export default FilterTag;
