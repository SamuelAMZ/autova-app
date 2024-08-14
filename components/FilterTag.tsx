import { View, Text } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

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
      <Text className={`${active ? "text-white" : ""}`}>Discover</Text>
    </View>
  );
};

export default FilterTag;
