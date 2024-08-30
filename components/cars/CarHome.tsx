import {
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Car from "@/models/car.model";
import { CarData } from "@/constants/CarData";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { BlurView as _BlurView } from "expo-blur";
import BrandCar from "./CarItem";
import { CarItemSkeleton } from "../skeleton/CarItemSkeleton";

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
  const [isLiked, setIsLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <View className="flex gap-[10px] ">
      <View className="flex-1 flex-row justify-between items-end  ">
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
      {false ? (
        <Carousel
          ref={ref}
          {...baseOptions}
          style={{
            width: width,
            justifyContent: "flex-start",
            paddingLeft: 0,
            marginLeft: 0,
          }}
          height={330}
          width={width * 0.86}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={loop}
          autoPlay={autoPlay}
          data={Array.from({ length: 8 })}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 5,
          }}
          renderItem={() => (
            <CarItemSkeleton className="mx-[5px]" page="home" />
          )}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
      ) : (
        <Carousel
          ref={ref}
          {...baseOptions}
          style={{
            width: width,
            justifyContent: "flex-start",
            paddingLeft: 0,
            marginLeft: 0,
          }}
          height={330}
          width={width * 0.86}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={loop}
          autoPlay={autoPlay}
          data={CarData}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 5,
          }}
          renderItem={renderItem}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
      )}
    </View>
  );
}
