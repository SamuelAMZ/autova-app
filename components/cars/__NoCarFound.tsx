import NoCarFoundIcon from "@/assets/icons/no-car.svg";
import { TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";

const NoCarFound = ({ handleRefresh }: { handleRefresh: () => void }) => {
  return (
    <View className="flex-1 h-[350] items-center justify-center">
      <NoCarFoundIcon />
      <ThemedText
        style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
        className="text-[16px]"
      >
        No car found
      </ThemedText>
      <TouchableOpacity onPress={() => handleRefresh()} className="p-3">
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          className="text-[blue] text-[16px]"
        >
          Retry
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default NoCarFound;
