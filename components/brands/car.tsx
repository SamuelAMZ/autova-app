import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import MySafeAreaView from "@/components/SafeAreaView";
import { Heart } from "iconsax-react-native";
import { useState } from "react";

import { Car } from "./types";

export default function BrandCar({
  car,
  onPress,
}: {
  car: Car;
  onPress: () => void;
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
            <ThemedText className="text-[#101828] text-[19px] font-[700] ">
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
          <View>
            <ThemedText className="text-[#101828] text-[17px] font-[800]">
              {car.price}
            </ThemedText>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 20,

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
