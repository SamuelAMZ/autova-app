import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Heart } from "iconsax-react-native";
import { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Car from "@/models/car.model";
import { CarData } from "@/constants/CarData";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";


export default function CarHome({
  car,
  onPress,
  imgHeight,
}: {
  car: Car;
  onPress: () => void;
  imgHeight?: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const width = Dimensions.get("window").width;
  const [mode, setMode] = useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = useState<"left" | "right">("left");
  const [pagingEnabled, setPagingEnabled] = useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true);
  const [loop, setLoop] = useState<boolean>(true);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [autoPlayReverse, setAutoPlayReverse] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const viewCount = 5;

  const renderItem = ({ item, index }: { item: Car; index: number }) => {
    return (
      <LongPressGestureHandler>
        <Animated.View>
          <TouchableOpacity onPress={() => onPress()} key={index}>
            <View
              style={styles.card}
              className="p-[16px] flex flex-col gap-[17px] bg-[#FFFFFF]">
              <View className="relative w-full">
                <Image
                  source={item.img}
                  style={{
                    borderRadius: 10,
                    width: "100%",
                  }}
                  className="aspect-auto"
                />
                <TouchableOpacity
                  onPress={handleLike}
                  style={{
                    borderRadius: 100,
                  }}
                  className="absolute right-2 top-2 bg-[#FFFFFF85] p-[10px]">
                  <Heart
                    color={isLiked ? "#5856D6" : "black"}
                    variant={isLiked ? "Bold" : "Linear"}
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-col gap-[15px] justify-center items-start">
                <ThemedText
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                  }}
                  className="text-[#101828] text-[19px]">
                  {item.name}
                </ThemedText>
                <View className="flex flex-row items-center justify-start gap-4">
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#F2F4F7",
                    }}>
                    <ThemedText className="p-[5px_12px] text-[15px] font-[600] text-[#101828]">
                      {item.year}
                    </ThemedText>
                  </View>
                  <ThemedText className="text-[#344054] font-[500] text-[14px]">
                    {item.label}
                  </ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </LongPressGestureHandler>
    );
  };

  return (
    <View className="flex gap-[10px]">
      <View className="flex-1 flex-row justify-between items-end ">
        <ThemedText
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
          }}
          className="font-semibold text-[18px]">
          Featured Dealers
        </ThemedText>
        <TouchableOpacity>
          <ThemedText className="text-[#007AFF] font-medium">
            View All
          </ThemedText>
        </TouchableOpacity>
      </View>
      <Carousel
        style={{
          width: "100%",
          height: 330,
        }}
        width={width * 0.85}
        height={330}
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        mode={mode}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayReverse={autoPlayReverse}
        data={CarData}
        modeConfig={{
          snapDirection,
          stackInterval: 15,          
        }}
        customConfig={() => ({ type: "positive", viewCount })}
        renderItem={renderItem}
      />
    </View>
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
