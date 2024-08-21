import * as Icon from "iconsax-react-native";
import { View } from "react-native";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";

const TabIcon = ({
  IconItem,
  focused,
  ...rest
}: Icon.IconProps & { IconItem: Icon.Icon; focused: boolean }) => {
  return (
    <IconItem
      size={24}
      color={focused ? Colors.background : Colors.textSecondary}
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
          focused ? `text-[${Colors.background}]` : `text-[${Colors.textSecondary}]`
        }`}
      >
        {title}
      </ThemedText>
    </View>
  );
};

export default TabItem;
