import * as Icon from "iconsax-react-native";
import { View } from "react-native";
import ThemedText from "./ThemedText";
import colors from "@/constants/Colors";

const TabIcon = ({
  IconItem,
  focused,
  ...rest
}: Icon.IconProps & { IconItem: Icon.Icon; focused: boolean }) => {
  return (
    <IconItem
      size={24}
      color={focused ? colors.background : colors.textSecondary}
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
          focused ? `text-[${colors.background}]` : `text-[${colors.textSecondary}]`
        }`}
      >
        {title}
      </ThemedText>
    </View>
  );
};

export default TabItem;
