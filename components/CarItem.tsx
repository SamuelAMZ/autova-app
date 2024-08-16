import { Heart, Notification } from "iconsax-react-native";
import { View, Text, Image } from "react-native";
import ThemedText from "./ThemedText";

const CarItem = () => {
  return (
    <View className="bg-white p-4 overflow-hidden relative shadow-sm rounded-xl">
      <Image
        className="w-full h-[190] rounded-lg"
        source={require("@/assets/images/audi.png")}
      />
      <View className="mt-4">
        <ThemedText className="text-[#101828] text-[18px] font-semibold">
          Audi A4 2.0T Premium
        </ThemedText>
        <ThemedText className="my-3 text-[#101828] font-medium">
          15,000 miles | New York, NY
        </ThemedText>
        <ThemedText className="font-extrabold">$25,000</ThemedText>
      </View>
      <View className="justify-center items-center w-[40] h-[40] bg-[#E6F0F0] rounded-3xl absolute top-6 right-6 border border-[#E6F0F0]">
        <Heart color="black" />
      </View>
    </View>
  );
};

export default CarItem;
