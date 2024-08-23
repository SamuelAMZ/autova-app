import React, { useCallback, useEffect, useRef, useState } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import ImageZoom from "react-native-image-pan-zoom";
import { useGlobalSearchParams } from "expo-router";

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
  const { currentIndex = 0 } = useGlobalSearchParams();

  console.log(currentIndex, "currentIndex");

  const [index, setIndex] = useState<number>(+currentIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // Handle onScroll
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

  // Viewable items changed callback
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

  //   // Auto slider reference
  //   // Auto slider reference
  //   let interval: NodeJS.Timeout | null = null;

  //   // const startAutoSlider = () => {
  //   //   if (interval) {
  //   //     clearInterval(interval); // Clear any existing interval before starting a new one
  //   //   }
  //   //   interval = setInterval(() => {
  //   //     setIndex((prevIndex) => (prevIndex + 1) % Slides.length);
  //   //   }, 3000);
  //   // };

  //   // const clearAutoSlider = () => {
  //   //   if (interval) {
  //   //     clearInterval(interval);
  //   //     interval = null;
  //   //   }
  //   // };

  //   // useEffect(() => {
  //   //   startAutoSlider();

  //   //   // Cleanup on unmount
  //   //   return () => clearAutoSlider();
  //   // }, [Slides.length]);

  // Scroll to index when updated manually (e.g., via next/previous)
  const scrollToIndex = (newIndex: number) => {
    flatListRef.current?.scrollToIndex({ index: newIndex });
    setIsZoomed(false);
  };

  // Initial scroll to index based on the currentIndex
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  // Handle Next
  const handleNext = () => {
    const newIndex = (index + 1) % Slides.length;
    setIndex(newIndex);
  };

  // Handle Previous
  const handlePrevious = () => {
    const newIndex = index === 0 ? Slides.length - 1 : index - 1;
    setIndex(newIndex);
    // scrollToIndex(newIndex);
  };

  return (
    <View className="relative">
      <FlatList
        data={Slides}
        renderItem={({ item }) => (
          <ImageZoom
            key={`${item.img}-${index}`}
            cropWidth={width}
            cropHeight={263}
            imageWidth={width}
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
                  const nextIndex =
                    index < Slides.length - 1 ? index + 1 : index;
                  scrollToIndex(nextIndex);
                } else if (offsetX > width / 4) {
                  // Swipe right (previous image)
                  const prevIndex = index > 0 ? index - 1 : 0;
                  scrollToIndex(prevIndex);
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
      <View className="absolute top-[35%] w-full px-[3%] flex-1 flex-row items-center justify-between">
        <PreviousImage onPress={handlePrevious} disabled={index === 0} />
        <NextImage
          onPress={handleNext}
          disabled={index === Slides.length - 1}
        />
      </View>
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

function NextImage({
  onPress,
  disabled,
}: {
  onPress: () => void;
  disabled: boolean;
}) {
  const Touch = disabled ? TouchableWithoutFeedback : TouchableOpacity;
  return (
    <>
      {disabled ? (
        <>
          <TouchableWithoutFeedback
            onPress={onPress}
            className={`flex items-center justify-center rounded-full p-[7px]  transition-all bg-[#ccccccd3] opacity-[.92]`}
          >
            <AntDesign name="arrowright" size={21} color="#000000c4" />
          </TouchableWithoutFeedback>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className={`flex items-center justify-center rounded-full p-[7px]  transition-all bg-[#ccccccb2]`}
          >
            <AntDesign
              name="arrowright"
              size={21}
              color={`${disabled ? "#000000c4" : "#000"}`}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

function PreviousImage({
  onPress,
  disabled,
}: {
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <>
      {disabled ? (
        <>
          <TouchableWithoutFeedback
            onPress={onPress}
            className={`flex items-center justify-center rounded-full p-[7px]  transition-all bg-[#ccccccd3] opacity-[1]`}
          >
            <AntDesign name="arrowleft" size={21} color="#000000c4" />
          </TouchableWithoutFeedback>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className={`flex items-center justify-center rounded-full p-[7px]  transition-all bg-[#ccccccb2]`}
          >
            <AntDesign
              name="arrowleft"
              size={21}
              color={`${disabled ? "#000000c4" : "#000"}`}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
}
