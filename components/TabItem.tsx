import * as Icon from "iconsax-react-native";
import { View } from "react-native";
import ThemedText from "./ThemedText";

const TabIcon = ({
  IconItem,
  focused,
  ...rest
}: Icon.IconProps & { IconItem: Icon.Icon; focused: boolean }) => {
  return (
    <IconItem
      size={24}
      color={focused ? "#5856D6" : "#475467"}
      {...rest}
      variant={focused ? "Bold" : "Linear"}
    />
  );
};

export type TabItemProps = {
  title: string;
  icon: Icon.Icon;
  focused?: boolean;
};

const TabItem = ({ focused, title, icon }: TabItemProps) => {
  return (
    <View className="items-center">
      <TabIcon IconItem={icon} focused={focused!} />
      <ThemedText
        className={`text-[13px] ${
          focused ? "text-[#5856D6]" : "text-[#475467]"
        }`}
      >
        {title}
      </ThemedText>
    </View>
  );
};

export default TabItem;
