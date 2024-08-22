import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Heart } from "iconsax-react-native";
import { useState } from "react";

import Car from "@/models/car.model";

export default function CarItem({
  car,
  onPress,
  imgHeight,
}: {
  car: Car;
  onPress: () => void;
  imgHeight?: number;
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={styles.card}
        className="p-[16px] flex flex-col gap-[17px] bg-[#FFFFFF]"
      >
        <View className="relative w-full">
          <Image
            source={car.img}
            style={{
              borderRadius: 10,
              // width: "100%",
            }}
            className=" max-w-[3429px] h-[180px] aspect-auto w-full"
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,

    // Different borders for each side
    borderTopWidth: 1,
    borderTopColor: "#0000001D",
    borderRightWidth: 1.5,
    borderRightColor: "#0000001D",
    borderBottomWidth: 2.5,
    borderBottomColor: "#0000001D",
    borderLeftWidth: 1.5,
    borderLeftColor: "#0000001D",
  },
});
