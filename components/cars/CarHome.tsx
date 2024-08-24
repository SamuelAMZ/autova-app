import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Heart } from "iconsax-react-native";
import { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Car from "@/models/car.model";
import { CarData } from "@/constants/CarData";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { BlurView as _BlurView } from "expo-blur";
import { parallaxLayout } from "./parallax";
import BrandCar from "./CarItem";

export default function CarHome({
  car,
  onPress,
  imgHeight,
}: {
  car: Car;
  onPress: () => void;
  imgHeight?: number;
}) {
  const width = Dimensions.get("window").width;
  const [loop, setLoop] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: width * 0.86,
        height: width * 0.6,
      } as const)
    : ({
        vertical: false,
        width: width,
      } as const);


  const renderItem = ({ item, index }: { item: Car; index: number }) => {
    return (
      <LongPressGestureHandler>
        <Animated.View>
          <BrandCar onPress={onPress} car={item} className="mx-[5px]" />
        </Animated.View>
      </LongPressGestureHandler>
    );
  };

  return (
    <View className="flex ">
      <View className="flex-1 flex-row justify-between items-end ">
        <ThemedText
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
          }}
          className="font-semibold text-[18px]"
        >
          Featured Dealers
        </ThemedText>
        <TouchableOpacity>
          <ThemedText className="text-[#007AFF] font-medium">
            View All
          </ThemedText>
        </TouchableOpacity>
      </View>
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{
          width: width,
        }}
        height={330}
        width={width * 0.93}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={loop}
        autoPlay={autoPlay}
        data={CarData}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
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
