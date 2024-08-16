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
      className={`px-5 py-[9px] rounded-[100] ${
        active ? "bg-[#5856D6]" : "border border-[#5856D6]"
      }`}
      {...rest}
    >
      <ThemedText className={`${active ? "text-white" : ""}`}>
        Discover
      </ThemedText>
    </View>
  );
};

export default FilterTag;
