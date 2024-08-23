import React, { useRef, useState } from "react";
import {
  Animated as RNAnimated,
  FlatList,
  View,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import ImageZoom from "react-native-image-pan-zoom";

import ThemedText from "../ThemedText";

interface Slide {
  img: any;
}

interface CarImagesSliderProps {
  Slides: Slide[];
  currentIndex: string | string[];
}

const ZoomCarImagesSlider: React.FC<CarImagesSliderProps> = ({
  Slides,
  currentIndex,
}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const { width, height } = useWindowDimensions();
  // const [isZoomed, setIsZoomed] = useState(false);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    RNAnimated.event(
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
      setIsZoomed(false);
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (index < Slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
      setIsZoomed(false);
      router.setParams({ currentIndex: index + 1 });
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      flatListRef.current?.scrollToIndex({ index: index - 1 });
      setIsZoomed(false);
      router.setParams({ currentIndex: index - 1 });
    }
  };

  //
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
      className="relative justify-center items-center bg-black"
    >
      <View
        style={{
          height: Dimensions.get("screen").height * 0.7,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <FlatList
          data={Slides}
          renderItem={({ item }) => (
            <ImageZoom
              key={`${item.img}-${index}`}
              cropWidth={Dimensions.get("screen").width}
              cropHeight={Dimensions.get("screen").height}
              imageWidth={Dimensions.get("screen").width}
              imageHeight={Dimensions.get("screen").height * 0.6}
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
              <Image
                resizeMode="contain"
                style={{ width, minHeight: 263 }}
                source={item.img}
              />
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
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingBottom: Platform.OS === "android" ? 35 : 60,
        }}
        className="px-[4%] w-full justify-between items-center"
      >
        <PreviousImage onPress={handlePrevious} disabled={index === 0} />
        <DisplayItemsRatio
          current={index + 1}
          totalItemsCount={Slides.length}
        />
        <NextImage
          onPress={handleNext}
          disabled={index === Slides.length - 1}
        />
      </View>
    </View>
  );
};

export default ZoomCarImagesSlider;

function NextImage({
  onPress,
  disabled,
}: {
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex items-center justify-center rounded-full p-3  transition-all ${
        disabled ? "bg-[#5856d6ba] opacity-[.75]" : "bg-[#5856D6]"
      }`}
    >
      <AntDesign
        name="arrowright"
        size={28}
        color={`${disabled ? "#ffffffc4" : "#FFFFFF"}`}
      />
    </TouchableOpacity>
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
    <TouchableOpacity
      onPress={onPress}
      className={`flex items-center justify-center rounded-full p-3 transition-all  ${
        disabled ? "bg-[#5856d6ba] opacity-[.75]" : "bg-[#5856D6]"
      }`}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color={`${disabled ? "#ffffffc4" : "#FFFFFF"}`}
      />
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
    <View className="bg-[#cccccc80] flex items-center justify-center p-3 rounded-full">
      <ThemedText className="text-[1.2rem]">
        {current}/{totalItemsCount}
      </ThemedText>
    </View>
  );
}
