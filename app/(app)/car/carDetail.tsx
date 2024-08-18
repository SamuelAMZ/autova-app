import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useState } from "react";

import { Heart } from "iconsax-react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { router } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";

import ThemedText from "@/components/ThemedText";
import RelatedCar from "@/components/brands/relatedCard";

export default function CarDetail() {
  const { width } = useWindowDimensions();
  const image = require("@/assets/cars/brandDetailCar.png");
  const [selected, setSelected] = useState("Details");

  return (
    <>
      <View className="flex-1 bg-white ">
        <CustomHeader />
        <ScrollView className="flex-1 pb-[1rem]">
          <View className=" ">
            <Image
              resizeMode="contain"
              source={image}
              style={{ width: width, height: 263 }}
            />
          </View>

          <View className="px-[5%] flex gap-[20px] py-[24px]">
            <ThemedText className="text-[#1D2939] text-[20px] font-[600]">
              Tesla Model X Long Range 316kW
            </ThemedText>

            <View className="flex-col gap-[22px] items-between">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/engine.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[16px]">
                    Automatic
                  </ThemedText>
                </View>
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/calendar.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[14px]">
                    12 X 12
                  </ThemedText>
                </View>
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/type.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[14px]">
                    Electric
                  </ThemedText>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/km.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[14px]">
                    316 kW
                  </ThemedText>
                </View>
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/plus.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[14px]">
                    10/2023
                  </ThemedText>
                </View>
                <View className="flex-row items-center justify-center gap-[8px]">
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("@/assets/cars/limit.png")}
                  />
                  <ThemedText className="text-[#344054] font-[400] text-[14px]">
                    60 705 km
                  </ThemedText>
                </View>
              </View>
            </View>

            <ThemedText className="text-[#5856D6] text-[28px] font-[700]">
              $68,490
            </ThemedText>

            <View className="flex items-start gap-[16px]">
              <Image source={require("@/assets/cars/Widget.png")} />
              {/* <View className="flex-row items-center justify-center gap-[8px]">
                <ThemedText className="text-[#344054] font-[400] text-[16px]">
                  30 days of return policy
                </ThemedText>
              </View>
              <View className="flex-row items-center justify-center gap-[8px]">
                <Image
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require("@/assets/cars/check.png")}
                />
                <ThemedText className="text-[#344054] font-[400] text-[16px]">
                  Risk-free purchase
                </ThemedText>
              </View> */}
            </View>

            <View className="flex-row items-center justify-between gap-[8px]">
              <TouchableOpacity
                onPress={() => {
                  setSelected("Specifications");
                }}
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor:
                    selected === "Specifications" ? "#5856D6" : "#EAECF0",
                  backgroundColor:
                    selected === "Specifications" ? "#5856D6" : "transparent",
                }}
                className="flex items-center justify-center"
              >
                <ThemedText
                  style={{
                    color:
                      selected === "Specifications" ? "#FFFFFF" : "#101828",
                  }}
                  className="p-[10px_20px] text-[16px]"
                >
                  Specifications
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelected("Details");
                }}
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: selected === "Details" ? "#5856D6" : "#EAECF0",
                  backgroundColor:
                    selected === "Details" ? "#5856D6" : "transparent",
                }}
                className="flex items-center justify-center"
              >
                <ThemedText
                  style={{
                    color: selected === "Details" ? "#FFFFFF" : "#101828",
                  }}
                  className="p-[10px_20px] text-[16px]"
                >
                  Details
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelected("Rating");
                }}
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: selected === "Rating" ? "#5856D6" : "#EAECF0",
                  backgroundColor:
                    selected === "Rating" ? "#5856D6" : "transparent",
                }}
                className="flex items-center justify-center"
              >
                <ThemedText
                  style={{
                    color: selected === "Rating" ? "#FFFFFF" : "#101828",
                  }}
                  className="p-[10px_20px] text-[16px]"
                >
                  Rating
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View>
              <ThemedText className="text-[#344054] text-[15px] font-[400]">
                Nisi purus felis enim dolor aliquet at enim viverra aenean.
                Placerat auctor arcu eu mollis tempor eu. Felis aliquet pharetra
                laoreet amet. Elit tristique id viverra velit interdum nullam
                non.
              </ThemedText>
              <ThemedText className="text-[#344054] text-[15px] font-[400]">
                Elementum netus mi scelerisque sit morbi quis. Augue pharetra
                mauris elit consequat amet. Neque ridiculus vitae pharetra at.
                Pulvinar sit habitant sit fermentum. Convallis sapien leo
                elementum et lectus quam eget porttitor. Nulla nisi ultricies id
                euismod.
              </ThemedText>
            </View>

            <TouchableOpacity className="bg-[#5856D6] p-[12px_20px] rounded-[12px] border border-solid border-[#5856D6]">
              <ThemedText className="text-[#FFFFFF] font-[600] text-[17px] text-center">
                Contact Seller
              </ThemedText>
            </TouchableOpacity>
            <RelatedCar />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

function CustomHeader({ title }: { title?: string }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {};
  return (
    <Header className=" px-[5%]">
      <View className="flex-row justify-between items-center py-[18px]">
        <View className="flex-row justify-start items-center gap-[13px] ">
          <TouchableOpacity
            style={{
              maxWidth: 45,
              height: "auto",
              borderRadius: 100,
            }}
            className="flex flex-row items-center justify-center bg-[#FFFFFF85] p-[11px]"
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} variant="Outline" color="#000000" />
          </TouchableOpacity>
          <ThemedText className="text-[#101828] text-[20px] font-[600]">
            Tesla Model X
          </ThemedText>
        </View>
        <View className="flex-row items-center justify-center gap-[12px]">
          <TouchableOpacity
            onPress={handleShare}
            style={{
              borderRadius: 100,
            }}
            className="  bg-[#FFFFFF85] px-[8px] py-[11px]"
          >
            <EvilIcons name="share-google" size={28} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            style={{
              borderRadius: 100,
            }}
            className="  bg-[#FFFFFF85] p-[10px]"
          >
            <Heart
              color={isLiked ? "#5856D6" : "black"}
              variant={isLiked ? "Bold" : "Linear"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Header>
  );
}

import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const Header = ({
  children,
  className,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`bg-[#D0D0D0] ${className}`}
      style={{ paddingTop: insets.top }}
      {...rest}
    >
      <StatusBar style="dark" translucent />
      {children}
    </View>
  );
};
