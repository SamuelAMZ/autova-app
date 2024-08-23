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
import { router, useFocusEffect, usePathname } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import ImageZoom from "react-native-image-pan-zoom";
// import Carousel from "react-native-snap-carousel";
import Carousel from "react-native-reanimated-carousel";

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

  const [index, setIndex] = useState<number>(+currentIndex);
  const imageRef = useRef();

  // Initial scroll to index based on the currentIndex
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

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
      <Carousel
        loop
        ref={imageRef}
        width={width}
        height={263}
        autoPlay={true}
        data={Slides}
        scrollAnimationDuration={1000}
        defaultIndex={index}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image style={{ width, minHeight: 263 }} source={item.img} />
          </View>
        )}
      />
      <Pagination data={Slides} index={index} />
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
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className={`flex items-center justify-center rounded-full p-[7px]  transition-all ${
          disabled ? " bg-[#cccccc80] opacity-[0.7]" : " bg-[#cccccc80]"
        }`}
      >
        <AntDesign
          name="arrowright"
          size={21}
          color={`${disabled ? "#000000aa" : "#000"}`}
        />
      </TouchableOpacity>
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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className={`flex items-center justify-center rounded-full p-[7px]  transition-all ${
          disabled ? " bg-[#cccccc80] opacity-[0.7]" : " bg-[#cccccc80]"
        }`}
      >
        <AntDesign
          name="arrowleft"
          size={21}
          color={`${disabled ? "#000000aa" : "#000"}`}
        />
      </TouchableOpacity>
    </>
  );
}
