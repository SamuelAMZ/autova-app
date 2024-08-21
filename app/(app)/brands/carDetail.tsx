import React, { useState, useMemo, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { Heart } from "iconsax-react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { router } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import ThemedText from "@/components/ThemedText";
import RelatedCar from "@/components/cars/relatedCard";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import CarImagesSlider from "@/components/carImagesSlider/slider";
import useStatusBar from "@/hooks/useStatusBar";
import Colors from "@/constants/Colors";

const data = [
  {
    img: require("@/assets/cars/teslaX.png"),
  },
  {
    img: require("@/assets/cars/teslaS.png"),
  },
  {
    img: require("@/assets/cars/teslaY.png"),
  },
];

export default function CarDetail() {
  useStatusBar("dark-content", "transparent", true);
  const { width, height } = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["55%", "60%", "90%"], []);

  const [selected, setSelected] = useState("Specifications");
  const scrollViewRef = useRef<ScrollView>(null);
  const specificationsRef = useRef<View>(null);
  const detailsRef = useRef<View>(null);

  const handleScrollTo = (ref) => {
    ref.current.measureLayout(scrollViewRef.current, (x, y) => {
      scrollViewRef.current?.scrollTo({ y, animated: true });
    });
  };

  // details and information view
  const handleSpecificationsView = () => {
    // setSelected("Specifications");
    handleScrollTo(specificationsRef);
  };

  const handleDetailsView = () => {
    // setSelected("Details");
    handleScrollTo(detailsRef);
  };

  // handle modal
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // sticky buttons on scroll
  const [headerHeight, setHeaderHeight] = useState(0);
  const [positionAbsolute, setPositionAbsolute] = useState(false);

  const handleSelectedViewWhenScrolling = () => {
    specificationsRef.current?.measure((x, y, width, height, pageX, pageY) => {
      if (pageY + headerHeight + 90 > 0) {
        setSelected("Specifications");
      } else {
        setSelected("Details");
      }
    });
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const scrollHeight = scrollPosition + 90;
    if (height - headerHeight < scrollHeight) {
      setPositionAbsolute(true);
    } else {
      setPositionAbsolute(false);
    }

    handleSelectedViewWhenScrolling();
  };

  return (
    <>
      <ImageBackground
        style={{ flex: 1, width: width, height: height }}
        resizeMode="cover"
        source={data[0].img}
        blurRadius={290}
      >
        <View className="flex-1">
          <View className="flex-1 ">
            <View
              onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
            >
              <CustomHeader />
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              {positionAbsolute ? (
                <View
                  style={{
                    alignItems: "center",
                  }}
                  className="w-full px-[4%] py-[.75rem] bg-white"
                >
                  <CarInformationButtons
                    handleSpecificationsView={handleSpecificationsView}
                    handleDetailsView={handleDetailsView}
                    selected={selected}
                  />
                </View>
              ) : null}
              <ScrollView
                ref={scrollViewRef}
                bounces={false}
                className="flex-1 pb-[1rem]"
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                <View
                  style={{
                    width: width,
                    minHeight: 263,
                  }}
                >
                  <CarImagesSlider Slides={data} />
                </View>

                <View
                  style={{
                    paddingTop: 28,
                    paddingBottom: 60,
                    backgroundColor: Colors.backgroundSecondaryVariant,
                  }}
                  className="px-[5%] flex gap-[20px]"
                >
                  <ThemedText
                    style={{
                      fontFamily: "SpaceGrotesk_600SemiBold",
                    }}
                    className="text-[#1D2939] text-[20px]"
                  >
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

                  <ThemedText
                    style={{
                      fontFamily: "SpaceGrotesk_600SemiBold",
                    }}
                    className="text-[#5856D6] text-[28px]"
                  >
                    $68,490
                  </ThemedText>

                  <View className="flex items-start gap-[16px] w-full">
                    <Image
                      className="w-full h-[90px]"
                      resizeMode="contain"
                      source={require("@/assets/cars/Widget.png")}
                      style={{
                        height: 100,
                      }}
                    />
                  </View>

                  {positionAbsolute ? null : (
                    <CarInformationButtons
                      handleSpecificationsView={handleSpecificationsView}
                      handleDetailsView={handleDetailsView}
                      selected={selected}
                    />
                  )}

                  <View
                    collapsable={false}
                    ref={specificationsRef}
                    onLayout={handleSelectedViewWhenScrolling}
                  >
                    <CarSpecifications />
                  </View>

                  <View
                    ref={detailsRef}
                  >
                    <CarDetails />
                  </View>

                  <RelatedCar />
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                paddingBottom: 30,
                paddingTop: 8,
              }}
              className="px-[4%] bg-white"
            >
              <TouchableOpacity
                onPress={handlePresentModalPress}
                className="bg-[#5856D6] p-[12px_20px] rounded-[12px] border border-solid border-[#5856D6]"
              >
                <ThemedText className="text-[#FFFFFF] font-[600] text-[17px] text-center">
                  Contact Seller
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <CustomBottomSheetModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            snapPoints={snapPoints}
            index={Platform.OS === "ios" ? 0 : 1}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
              className="w-full px-[4%] "
            >
              <View className="pt-[1rem] flex-row justify-between items-center w-full">
                <ThemedText
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                  }}
                  className="text-[20px] text-[#000000]"
                >
                  Contact Dealer
                </ThemedText>
                <TouchableOpacity onPress={handleCloseModal}>
                  <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                    <AntDesign name="close" size={16} color="#3D3D3D" />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="flex justify-center gap-[26px] pt-[36px]">
                <ThemedText
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                  }}
                  className="text-[#101828] text-[17px] text-center"
                >
                  How would you like to contact the dealer?
                </ThemedText>
                <View className="flex items-start justify-center gap-[16px]">
                  <TouchableOpacity className="flex-row  items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full">
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require("@/assets/logos_whatsapp-icon.png")}
                    />
                    <ThemedText className="text-[#344054] text-[17px]  font-[500]">
                      Continue via WhatsApp
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row  items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full">
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require("@/assets/logos_telegram.png")}
                    />
                    <ThemedText className="text-[#344054] text-[17px]  font-[500]">
                      Continue via Telegram
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full">
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require("@/assets/ion_call.png")}
                    />
                    <ThemedText className="text-[#344054] text-[17px]  font-[500]">
                      Contact via phone call
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                <ThemedText className="text-[#101828] text-[14px] font-[400] text-center text-clip">
                  * Keep your communication private. Avoid sharing sensitive
                  information with the seller.
                </ThemedText>
              </View>
            </View>
          </CustomBottomSheetModal>
        </View>
      </ImageBackground>
    </>
  );
}

function CarInformationButtons({
  handleSpecificationsView,
  handleDetailsView,
  selected,
}:
{
  handleSpecificationsView: () => void;
  handleDetailsView: () => void;
  selected: string;
}) {
  return (
    <View
      className="flex-row items-center justify-between gap-[8px]"
    >
      <TouchableOpacity
        onPress={handleSpecificationsView}
        style={{
          flex: 0.5,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: selected === "Specifications" ? "#5856D6" : "#EAECF0",
          backgroundColor:
            selected === "Specifications" ? "#5856D6" : "transparent",
        }}
        className="flex items-center justify-center"
      >
        <ThemedText
          style={{
            color: selected === "Specifications" ? "#FFFFFF" : "#101828",
          }}
          className="p-[10px_20px] text-[16px]"
        >
          Specifications
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDetailsView}
        style={{
          flex: 0.5,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: selected === "Details" ? "#5856D6" : "#EAECF0",
          backgroundColor: selected === "Details" ? "#5856D6" : "transparent",
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
    </View>
  );
}

function CarDetails() {
  return (
    <View className="py-[10px]">
      <ThemedText className="text-[#344054] text-[15px] font-[400]">
        Nisi purus felis enim dolor aliquet at enim viverra aenean. Placerat
        auctor arcu eu mollis tempor eu. Felis aliquet pharetra laoreet amet.
        Elit tristique id viverra velit interdum nullam non.
      </ThemedText>
      <ThemedText className="text-[#344054] text-[15px] font-[400]">
        Elementum netus mi scelerisque sit morbi quis. Augue pharetra mauris
        elit consequat amet. Neque ridiculus vitae pharetra at. Pulvinar sit
        habitant sit fermentum. Convallis sapien leo elementum et lectus quam
        eget porttitor. Nulla nisi ultricies id euismod.
      </ThemedText>
    </View>
  );
}

function CarSpecifications() {
  const data = [
    {
      Brand: "Tesla",
    },
    {
      Model: "Model X Long Range",
    },
    {
      "Trim/Edition": "Hybrid Edition",
    },
    {
      "Year of Manufacture": "2022",
    },
    {
      "Registration Year": "2024",
    },
    {
      Condition: "New",
    },
    {
      Transmission: "Automatic",
    },
    {
      "Body Type": "SUV / 4x4",
    },
    {
      "Fuel Type": "Octane",
    },
    {
      "Engine Capacity": "1500cc",
    },
  ];
  return (
    <View className="flex gap-[16px] justify-center py-[12px]">
      {data.map((item, idx) => {
        return (
          <View
            key={idx}
            className="flex-1 flex-row justify-start gap-[14px] items-center"
          >
            <ThemedText
              style={{
                flex: 0.5,
              }}
              className="text-[#1D2939] text-[16px] underline"
            >
              {Object.keys(item)[0]}:
            </ThemedText>
            <ThemedText
              style={{
                flex: 0.5,
              }}
              className="text-[#475467] text-[16px]"
            >
              {Object.values(item)[0]}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

function CustomHeader({ title }: { title?: string }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {};
  return (
    <Header
      className=" px-[5%]"
    >
      <View className="flex-row justify-between items-center py-[18px]">
        <View className="flex-row justify-start items-center gap-[13px] ">
          <TouchableOpacity
            style={{
              maxWidth: 45,
              height: "auto",
              borderRadius: 100,
            }}
            className="flex flex-row items-center justify-center bg-[#FFFFFF85] border border-solid border-[#a7a7a777] p-[11px]"
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
            className="h-[45] w-[45] rounded-[100px] items-center justify-center bg-[#FFFFFF85] border border-solid border-[#a7a7a730]"
          >
            <EvilIcons name="share-google" size={28} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            className="h-[45] w-[45] rounded-[100px] items-center justify-center bg-[#FFFFFF85] border border-solid border-[#a7a7a730]"
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
