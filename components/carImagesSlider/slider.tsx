import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ImageZoom from "react-native-image-pan-zoom";
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

  const [index, setIndex] = useState<number>(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const zoomImageRef = useRef<any>(null);

  const [loop, setLoop] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState(false);

  // Initial scroll to index based on the currentIndex
  useEffect(() => {
    setIndex(+currentIndex || 0);
    setScrollIndex(+currentIndex || 0);
  }, [currentIndex]);

  const handleZoom = () => {
    router.navigate({
      pathname: "/(app)/brands/imageZoom",
      params: {
        currentIndex: index,
      },
    });
  };

  const handleNext = () => {
    setIsZoomed(false);
    zoomImageRef.current?.resetScale();

    if (index < Slides.length - 1) {
      carouselRef.current?.scrollTo({ index: index + 1, animated: true });
    }

    setAutoPlay(false);
    const timer = setTimeout(() => {
      setAutoPlay(true);
      // console.log(autoPlay, "restart autoplay next");
      clearTimeout(timer);
    }, 1500);
  };

  const handlePrevious = () => {
    setIsZoomed(false);
    zoomImageRef.current?.resetScale();

    if (index > 0) {
      carouselRef.current?.scrollTo({ index: index - 1, animated: true });
    }

    setAutoPlay(false);
    const timer = setTimeout(() => {
      setAutoPlay(true);
      // console.log(autoPlay, "restart autoplay prev");
      clearTimeout(timer);
    }, 1500);
  };

  return (
    <View className="relative">
      <Carousel
        ref={carouselRef}
        width={width}
        height={263}
        data={Slides}
        scrollAnimationDuration={1000}
        defaultIndex={index}
        onSnapToItem={(index) => setIndex(index)}
        onProgressChange={() => {
          setScrollIndex(+carouselRef.current?.getCurrentIndex() || 0);
        }}
        loop={loop}
        autoPlay={autoPlay}
        renderItem={({ item, index }) => (
          <ImageZoom
            key={`${item.img}-${index}`}
            ref={zoomImageRef}
            cropWidth={width}
            cropHeight={263}
            imageWidth={width}
            imageHeight={263}
            enableDoubleClickZoom={false}
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
                  handleNext();
                } else if (offsetX > width / 4) {
                  // Swipe right (previous image)
                  handlePrevious();
                }
              }
            }}
          >
            <Image style={{ width, minHeight: 263 }} source={item.img} />
          </ImageZoom>
        )}
      />
      <Pagination data={Slides} index={scrollIndex} />
      <TargetItemZoom onPress={handleZoom} />
      <DisplayItemsRatio
        current={scrollIndex + 1}
        totalItemsCount={Slides.length}
      />
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
