import { View, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

export function ErrorLoadingData({ refetch }: { refetch: () => void }) {
  return (
    <View className="flex-row items-center justify-center gap-3">
      <ThemedText className="text-[17px]">Something went wrong.</ThemedText>
      <TouchableOpacity
        onPress={() => {
          refetch();
        }}
      >
        <ThemedText className="text-[17px]">Refetch</ThemedText>
      </TouchableOpacity>
    </View>
  );
}
