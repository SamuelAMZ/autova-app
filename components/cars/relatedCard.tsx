import { useRef, useState } from "react";

import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { BlurView as _BlurView } from "expo-blur";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { router } from "expo-router";

import Car from "@/models/car.model";
import CarItem from "./CarItem";
import ThemedText from "@/components/ThemedText";

import { loadRelatedCars } from "@/utils/carRequest";
import { useQuery } from "@tanstack/react-query";
import { getSavedCar, loadCars } from "@/utils/carRequest";
import { useTranslation } from "react-i18next";

export default function RelatedCar({ carId }: { carId: string }) {
  const { t } = useTranslation();
  const width = Dimensions.get("window").width;
  const [loop, setLoop] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const ref = useRef<ICarouselInstance>(null);

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

  // load brands
  // const listingRelatedCarsQuery = useQuery({
  //   queryKey: ["listing-cars"],
  //   queryFn: () => loadRelatedCars({ page: 1, carId: carId }),
  // });

  const listingRelatedCarsQuery = useQuery({
    queryKey: ["listing-cars"],
    queryFn: () => loadCars({ page: 1 }),
  });

  const getSavedCarsQuery = useQuery({
    queryKey: ["get-saved-cars"],
    queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  });

  const renderItem = ({ item, index }: { item: Car; index: number }) => {
    return (
      <LongPressGestureHandler>
        <Animated.View>
          <CarItem
            className="mx-[5px]"
            car={item}
            savedCarsId={getSavedCarsQuery.data?.carsId || []}
            onPress={() => {
              router.navigate({
                pathname: "/(app)/brands/carDetail",
                params: {
                  carId: item._id,
                },
              });
            }}
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
          {t("components.carsList.title")}
        </ThemedText>
        <TouchableOpacity>
          <ThemedText className="text-[#007AFF] font-medium">
            {t("components.carsList.viewAll")}
          </ThemedText>
        </TouchableOpacity>
      </View>
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
        data={listingRelatedCarsQuery?.data?.data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 5,
        }}
        renderItem={renderItem}
      />
    </View>
  );
}
