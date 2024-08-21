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
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ImageZoom from "react-native-image-pan-zoom";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

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
      const newIndex = viewableItems[0]?.index || 0;
      setIndex(newIndex);
      setIsZoomed(false);
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
          <ImageZoom
            key={`${item.img}-${index}`}
            cropWidth={Dimensions.get("screen").width}
            cropHeight={263}
            imageWidth={Dimensions.get("screen").width}
            imageHeight={263}
            onDoubleClick={() => {
              handleZoom();
            }}
            onMove={({ scale }) => {
              if (scale !== 1) {
                setIsZoomed(true);
              } else {
                setIsZoomed(false);
              }
            }}
            horizontalOuterRangeOffset={(offsetX) => {
              if (!isZoomed) {
                // Allow swipe to change image if not zoomed in
                if (offsetX < -width / 4) {
                  // Swipe left (next image)
                  flatListRef.current?.scrollToIndex({
                    index: index < Slides.length - 1 ? index + 1 : index,
                    animated: true,
                  });
                } else if (offsetX > width / 4) {
                  // Swipe right (previous image)
                  flatListRef.current?.scrollToIndex({
                    index: index > 0 ? index - 1 : 0,
                    animated: true,
                  });
                }
              }
            }}
          >
            <Image style={{ width, minHeight: 263 }} source={item.img} />
          </ImageZoom>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ref={flatListRef}
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
      className="absolute bottom-4 right-4 bg-[#cccccc80] flex items-center justify-center p-[.45rem] rounded-full"
    >
      <MaterialIcons name="zoom-out-map" size={20} color="#000000" />
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
    <View className="absolute bottom-4 left-4 bg-[#cccccc80] flex items-center justify-center p-[.45rem] rounded-full">
      <ThemedText className="text-[1rem] text-[#000000]">
        {current}/{totalItemsCount}
      </ThemedText>
    </View>
  );
}
