import React, { useEffect, useRef, useState } from "react";
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageZoom from "react-native-image-pan-zoom";
import Carousel from "react-native-reanimated-carousel";

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
  currentIndex = 0,
}) => {
  const [index, setIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const carouselRef = useRef<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIndex(+currentIndex || 0);
  }, [currentIndex]);

  const handleNext = () => {
    if (index < Slides.length - 1) {
      setIsZoomed(false);
      carouselRef.current?.scrollTo({ index: index + 1, animated: true });
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIsZoomed(false);
      carouselRef.current?.scrollTo({ index: index - 1, animated: true });
    }
  };

  return (
    <View
      style={{ flex: 1 }}
      className="relative justify-center items-center bg-black"
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Carousel
          loop
          ref={carouselRef}
          width={width}
          height={height * 0.8}
          autoPlay={!isZoomed}
          data={Slides}
          scrollAnimationDuration={1000}
          defaultIndex={index}
          onSnapToItem={(index) => setIndex(index)}
          renderItem={({ item }) => (
            <ImageZoom
              key={`${item.img}-${index}`}
              cropWidth={width}
              cropHeight={height}
              imageWidth={width}
              imageHeight={height * 0.5}
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
                    handleNext();
                  } else if (offsetX > width / 4) {
                    // Swipe right (previous image)
                    handlePrevious();
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
        />
      </View>

      <View
        style={{
          flex: 0.18,
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
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex items-center justify-center rounded-full p-3 transition-all  ${
        disabled ? " bg-[#5856d6aa] opacity-[.75]" : " bg-[#5856D6]"
      }`}
    >
      <AntDesign
        name="arrowright"
        size={24}
        color={`${disabled ? " #ffffffaa" : " #FFFFFF"}`}
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
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex items-center justify-center rounded-full p-3 transition-all  ${
        disabled ? " bg-[#5856d6aa] opacity-[.75]" : " bg-[#5856D6]"
      }`}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color={`${disabled ? " #ffffffaa" : " #FFFFFF"}`}
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
