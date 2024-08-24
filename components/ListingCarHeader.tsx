import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import ThemedText from "./ThemedText";


export default function ListingCarHeader() {
  return (
    <View className="flex flex-row w-full justify-between items-center mt-[15px]">
      <View className="flex flex-row gap-[12px] items-center">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
          style={{ backgroundColor: "#c1c1c1" }}
        >
          <Feather name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <ThemedText
          className="text-[#101828] text-[20px]"
          style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
        >
          List Your Car
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.navigate("/(app)/(navs)/listing");
        }}
        className="justify-center items-center p-3 bg-[#c1c1c1] rounded-full"
        style={{ backgroundColor: "#c1c1c1" }}
      >
        <AntDesign name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
