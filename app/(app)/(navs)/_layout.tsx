import TabItem, { TabItemProps } from "@/components/TabItem";
import { Tabs } from "expo-router";
import * as Icon from "iconsax-react-native";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: "red",
  tabBarStyle: {
    height: Platform.OS === "android" ? 60 : 90,
  },
};

const tabOptions = ({ title, icon }: TabItemProps) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <TabItem focused={focused} title={title} icon={icon} />
    ),
  };
};

const AppLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={tabOptions({
          title: `${t("components.tabBar.home")}`,
          icon: Icon.Home2,
        })}
      />
      <Tabs.Screen
        name="listing/index"
        options={tabOptions({
          title: `${t("components.tabBar.listing")}`,
          icon: Icon.Tag2,
        })}
      />
      <Tabs.Screen
        name="saved/index"
        options={tabOptions({
          title: `${t("components.tabBar.saved")}`,
          icon: Icon.Heart,
        })}
      />
      <Tabs.Screen
        name="account/index"
        options={tabOptions({
          title: `${t("components.tabBar.account")}`,
          icon: Icon.User,
        })}
      />
    </Tabs>
  );
};

export default AppLayout;
