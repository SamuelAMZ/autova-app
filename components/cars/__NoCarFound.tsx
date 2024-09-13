import NoCarFoundIcon from "@/assets/icons/no-car.svg";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { useTranslation } from "react-i18next";

const NoCarFound = ({ handleRefresh }: { handleRefresh: () => void }) => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 h-[350] items-center justify-center">
      <NoCarFoundIcon />
      <ThemedText
        style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
        className="text-[16px]"
      >
        {t("components.noCarFound.title")}
      </ThemedText>
      <TouchableOpacity onPress={() => handleRefresh()} className="p-3">
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          className="text-[blue] text-[16px]"
        >
          {t("components.noCarFound.retry")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default NoCarFound;
