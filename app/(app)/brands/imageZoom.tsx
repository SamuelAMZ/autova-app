import React from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";

import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import useStatusBar from "@/hooks/useStatusBar";

import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";

import ZoomCarImagesSlider from "@/components/carImagesSlider/zoomSlider";

export default function CarImagesDetail() {
  const { width } = useWindowDimensions();
  const {
    currentIndex,
    carId,
    ...slides
  }: { carId: string; currentIndex: string } = useLocalSearchParams();
  useStatusBar("light-content", "transparent", true);

  return (
    <>
      <View className="flex-1">
        <View className="flex-1 ">
          <CustomHeader currentIndex={currentIndex} carId={carId} />
          <View
            style={{
              flex: 1,
              width: width,
              minHeight: 263,
            }}
          >
            <ZoomCarImagesSlider
              Slides={Object.values(slides)}
              currentIndex={currentIndex}
            />
          </View>
        </View>
      </View>
    </>
  );
}

function CustomHeader({
  title,
  currentIndex,
  carId,
}: {
  title?: string;
  currentIndex: string | string[];
  carId: string;
}) {
  return (
    <Header className=" px-[5%] bg-black">
      <View className="flex-row justify-between items-center py-[18px]">
        <View className="flex-row justify-start items-center gap-[13px] ">
          <TouchableOpacity
            style={{
              maxWidth: 45,
              height: "auto",
              borderRadius: 100,
            }}
            className="flex flex-row items-center justify-center bg-[#cccccc80] p-[11px]"
            onPress={() => {
              router.navigate({
                pathname: "./carDetail",
                params: {
                  carId: carId,
                  currentIndex: currentIndex,
                },
              });
            }}
          >
            <AntDesign name="close" size={18} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </Header>
  );
}

const Header = ({
  children,
  className,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={` ${className}`}
      style={{ paddingTop: insets.top }}
      {...rest}
    >
      <StatusBar style="dark" translucent />
      {children}
    </View>
  );
};
