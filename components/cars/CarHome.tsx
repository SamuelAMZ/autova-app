import { View, TouchableOpacity, Dimensions } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Car from "@/models/car.model";
import { CarData } from "@/constants/CarData";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { BlurView as _BlurView } from "expo-blur";
import CarItem from "./CarItem";
import { CarItemSkeleton } from "../skeleton/CarItemSkeleton";
import { useQuery } from "@tanstack/react-query";
import { loadCars } from "@/utils/carRequest";
import { getSavedCar } from "@/utils/carRequest";
import { router } from "expo-router";
import { ErrorLoadingData } from "../ErrorLoading";

export default function CarHome({ imgHeight }: { imgHeight?: number }) {
  const width = Dimensions.get("window").width;
  const [loop, setLoop] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const ref = useRef<ICarouselInstance>(null);
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

  const listingCarsQuery = useQuery({
    queryKey: ["listing-cars"],
    queryFn: loadCars,
  });

  const getSavedCarsQuery = useQuery({
    queryKey: ["get-saved-cars"],
    queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <LongPressGestureHandler>
        <Animated.View>
          <CarItem
            onPress={() => {
              router.navigate({
                pathname: "/(app)/brands/carDetail",
                params: {
                  carId: item._id,
                },
              });
            }}
            car={item}
            savedCarsId={getSavedCarsQuery.data?.carsId || []}
            className="mx-[5px]"
          />
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
      {listingCarsQuery.isLoading ? (
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
      ) : null}

      {listingCarsQuery.isSuccess ? (
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
          data={listingCarsQuery?.data?.data}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 5,
          }}
          renderItem={renderItem}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
      ) : null}

      {listingCarsQuery.isError ? (
        <ErrorLoadingData refetch={listingCarsQuery.refetch} />
      ) : null}
    </View>
  );
}
