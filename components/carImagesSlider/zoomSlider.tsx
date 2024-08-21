import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
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
} from "react-native";
import Animated from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalSearchParams } from "expo-router";
import ThemedText from "../ThemedText";

interface Slide {
  img: any;
}

interface CarImagesSliderProps {
  Slides: Slide[];
}

const ZoomableImage = ({ source }: { source: any }) => {
  const { width, height } = useWindowDimensions();
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Pinch gesture handler
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
      },
      onEnd: () => {
        if (scale.value < 1) {
          scale.value = withTiming(1);
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
        }
      },
    });

  // Pan gesture handler
  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      if (scale.value === 1) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    },
  });

  // Double-tap gesture handler
  const doubleTapHandler = () => {
    if (scale.value > 1) {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    } else {
      scale.value = withSpring(2);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <TapGestureHandler onActivated={doubleTapHandler} numberOfTaps={2}>
      <Animated.View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="items-center justify-center"
      >
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={{ flex: 1 }}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Image
                  source={source}
                  style={[
                    animatedStyle,
                    {
                      width,
                      minHeight: 263,
                    },
                  ]}
                  resizeMode="cover"
                />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};
// const ZoomableImage = ({ source }: { source: any }) => {
//   const { width } = useWindowDimensions();
//   const scale = useSharedValue(1);

//   // Pinch gesture handler
//   const pinchHandler =
//     useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
//       onActive: (event) => {
//         scale.value = event.scale;
//       },
//       onEnd: () => {
//         scale.value = withTiming(1);
//       },
//     });

//   // Double-tap gesture handler
//   const doubleTapHandler = () => {
//     scale.value = scale.value > 1 ? withTiming(1) : withSpring(2);
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: scale.value }],
//     };
//   });

//   return (
//     <TapGestureHandler onActivated={doubleTapHandler} numberOfTaps={2}>
//       <Animated.View
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         className=" items-center justify-center"
//       >
//         <PinchGestureHandler onGestureEvent={pinchHandler}>
//           <Animated.View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <Animated.Image
//               source={source}
//               style={[
//                 animatedStyle,
//                 {
//                   width,
//                   minHeight: 263,
//                 },
//               ]}
//               resizeMode="cover"
//             />
//           </Animated.View>
//         </PinchGestureHandler>
//       </Animated.View>
//     </TapGestureHandler>
//   );
// };

const ZoomCarImagesSlider: React.FC<CarImagesSliderProps> = ({ Slides }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const { currentIndex } = useGlobalSearchParams();
  const { width, height } = useWindowDimensions();

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
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (index < Slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      flatListRef.current?.scrollToIndex({ index: index - 1 });
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
      className="relative justify-center items-center bg-black"
    >
      <FlatList
        data={Slides}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            className=" justify-center items-center"
          >
            <ZoomableImage source={item.img} />
          </View>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View
        style={{
          flexDirection: "row",
          paddingBottom: Platform.OS === "android" ? 35 : 60,
        }}
        className="px-[4%] w-full justify-between items-center"
      >
        <PreviousImage onPress={handlePrevious} />
        <DisplayItemsRatio
          current={index + 1}
          totalItemsCount={Slides.length}
        />
        <NextImage onPress={handleNext} />
      </View>
    </View>
  );
};

export default ZoomCarImagesSlider;

function NextImage({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" bg-[#5856D6] flex items-center justify-center rounded-full p-3"
    >
      <AntDesign name="arrowright" size={28} color="white" />
    </TouchableOpacity>
  );
}

function PreviousImage({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" bg-[#5856D6] flex items-center justify-center rounded-full p-3"
    >
      <AntDesign name="arrowleft" size={24} color="white" />
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
    <View className="bg-[#fffffff5] flex items-center justify-center p-3 rounded-full">
      <ThemedText className="text-[1.2rem]">
        {current}/{totalItemsCount}
      </ThemedText>
    </View>
  );
}
