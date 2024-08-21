import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import Pagination from "./Pagination";
import ThemedText from "../ThemedText";

interface Slide {
  img: any;
}

interface CarImagesSliderProps {
  Slides: Slide[];
}

const CarImagesSlider: React.FC<CarImagesSliderProps> = ({ Slides }) => {
  const { width } = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number }> }) => {
      setIndex(viewableItems[0]?.index || 0);
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleZoom = () => {
    router.navigate({
      pathname: "/(app)/brands/imageZoom",
      params: {
        currentIndex: index,
      },
    });
  };

  return (
    <View className="relative">
      <FlatList
        data={Slides}
        renderItem={({ item }) => (
          <Image
            resizeMode="cover"
            source={item.img}
            style={{ width, minHeight: 263 }}
          />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      <TargetItemZoom onPress={handleZoom} />
      <DisplayItemsRatio current={index + 1} totalItemsCount={Slides.length} />
    </View>
  );
};

export default CarImagesSlider;

function TargetItemZoom({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-4 right-4 bg-[#ffffffd5] flex items-center justify-center rounded-sm"
    >
      <Feather name="zoom-in" size={28} color="#5856D6" />
    </TouchableOpacity>
  );
}

function DisplayItemsRatio({
  current,
  totalItemsCount,
}: {
  current: number;
  totalItemsCount: number;
}) {
  return (
    <View className="absolute bottom-4 left-4 bg-[#ffffffd5] flex items-center justify-center p-[.2rem] rounded-sm">
      <ThemedText className="text-[1rem]">
        {current}/{totalItemsCount}
      </ThemedText>
    </View>
  );
}
