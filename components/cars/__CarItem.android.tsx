import { Heart } from "iconsax-react-native";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedText from "../ThemedText";
import { useState } from "react";

import Car from "@/models/car.model";

export default function CarItem({
  car,
  onPress,
  className,
}: {
  car: Car;
  onPress: () => void;
  imgHeight?: number;
  className?: any;
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableWithoutFeedback
      className={`${className}`}
      onPress={() => onPress()}
    >
      <View
        style={{
          shadowColor: "#000",
          // shadowOffset: 1,
        }}
        className="bg-white p-1"
      >
        <View className="px-[16px] py-[18px] flex flex-col gap-[17px] bg-[#FFFFFF] rounded-[10px] shadow shadow-black">
          <View className="relative">
            <Image
              source={car.img}
              style={{
                borderRadius: 10,
              }}
              className="w-full max-w-[329px] h-[180px] object-contain aspect-auto"
            />
            <TouchableOpacity
              onPress={handleLike}
              style={{
                borderRadius: 100,
              }}
              className="absolute right-2 top-2 bg-[#FFFFFF85] p-[10px]"
            >
              <Heart
                color={isLiked ? "#5856D6" : "black"}
                variant={isLiked ? "Bold" : "Linear"}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-col gap-[15px] justify-center items-start">
            <View>
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[#101828] text-[19px]"
              >
                {car.name}
              </ThemedText>
            </View>
            <View className="flex flex-row items-center justify-start gap-4">
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#F2F4F7",
                }}
              >
                <ThemedText className="p-[5px_12px] text-[15px] font-[600] text-[#101828]">
                  {car.year}
                </ThemedText>
              </View>
              <ThemedText className="text-[#344054] font-[500] text-[15px]">
                {car.label}
              </ThemedText>
            </View>
            {/* <View>
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="text-[#101828] text-[17px]"
              >
                ${car.price}
              </ThemedText>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
