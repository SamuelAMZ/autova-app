import { Heart } from "iconsax-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";
import Car from "@/models/car.model";
import { useState } from "react";

const CarItem = ({ car }: { car: Car }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View className="bg-white p-1">
      <View className="flex-1 bg-white rounded-2xl shadow shadow-black p-4">
        <Image className="w-full rounded-lg" source={car.img} />
        <View className="mt-4">
          <ThemedText className="text-[#101828] text-[18px] font-semibold">
            {car.name}
          </ThemedText>
          <View className="flex flex-row items-center justify-start gap-4">
            <View className="rounded-[100px] bg-[#F2F4F7]">
              <ThemedText className="p-[4px_12px] font-jakarta_semiBold text-[#101828]">
                {car.year}
              </ThemedText>
            </View>
            <ThemedText className="my-3 text-[#101828] font-medium">
              {car.label}
            </ThemedText>
          </View>
          <ThemedText className="font-extrabold">${car.price}</ThemedText>
        </View>
        <TouchableOpacity
          onPress={() => setIsLiked(!isLiked)}
          className="justify-center items-center w-[40] h-[40] bg-[#E6F0F0] rounded-3xl absolute top-6 right-6 border border-[#E6F0F0]"
        >
          {isLiked ? (
            <Heart color="#5856D6" variant="Bold" />
          ) : (
            <Heart color="black" variant="Linear" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarItem;
