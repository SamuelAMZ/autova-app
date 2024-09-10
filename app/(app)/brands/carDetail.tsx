import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { Car, Heart } from "iconsax-react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { BarIndicator } from "react-native-indicators";

import ThemedText from "@/components/ThemedText";
import RelatedCar from "@/components/cars/relatedCard";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import CarImagesSlider from "@/components/carImagesSlider/slider";
import colors from "@/constants/Colors";

import { ImageSliderSkeleton } from "@/components/skeleton/carDetails/imageSliderSkeleton";
import { thousandSeparator } from "@/constants/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getColors } from "react-native-image-colors";

import {
  isCarSaved,
  saveSingleCar,
  unSaveSingleCar,
  getCarById,
} from "@/utils/carRequest";

import {
  openTelegram,
  openWhatsApp,
  makePhoneCall,
} from "@/utils/handleDeepLinks";
import { extractLastDigits } from "@/utils/extractLastDigits";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import Colors from "@/constants/Colors";

export default function CarDetail() {
  const [statusBarType, setStatusBarType] = useState("dark");
  const { width, height } = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["55%", "60%", "90%"], []);

  const [selected, setSelected] = useState("Specifications");
  const scrollViewRef = useRef<ScrollView>(null);
  const specificationsRef = useRef<View>(null);
  const detailsRef = useRef<View>(null);
  const [selectedElmHeight, setSelectedElementHeightValue] = useState(0);

  const handleScrollTo = (ref: any, scale: number = 0) => {
    ref.current.measureLayout(scrollViewRef.current, (x: any, y: any) => {
      scrollViewRef.current?.scrollTo({ y: y + scale, animated: true });
    });
  };

  // details and information view
  const handleSpecificationsView = () => {
    setSelected("Specifications");
    handleScrollTo(specificationsRef);
  };

  const handleDetailsView = () => {
    setSelected("Details");
    if (!positionAbsolute) {
      handleScrollTo(detailsRef, -70);
    } else {
      handleScrollTo(detailsRef);
    }
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
      if (pageY + headerHeight + 50 > 0) {
        setSelected("Specifications");
      } else {
        setSelected("Details");
      }
    });
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const screenHeight = height;

    specificationsRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const platformValue = Platform.OS === "ios" ? 90 : 0;
      const scrollHeight = scrollPosition;
      if (screenHeight - height - platformValue < scrollHeight - pageY) {
        setPositionAbsolute(true);

        // increase the height of the display so that the item can be viewed with full scrolling
        const ref =
          selected === "Specifications" ? specificationsRef : detailsRef;
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
          const elemHeight = Math.floor(
            +(height / Math.floor(Math.abs(extractLastDigits(+height))))
          );
          setSelectedElementHeightValue(elemHeight > 40 ? elemHeight : 100);
        });
      } else {
        setPositionAbsolute(false);
        setSelectedElementHeightValue(0);
      }
    });

    handleSelectedViewWhenScrolling();
  };

  // get car detail
  const { carId }: { carId: string } = useLocalSearchParams();

  const carDetailQuery = useQuery({
    queryKey: ["carDetail", carId],
    queryFn: () => getCarById({ id: carId }),
  });

  // console.log(JSON.stringify(carDetailQuery, null, 2), "carDetailQuery", carId);

  function CarSpecifications() {
    const data = [
      {
        Brand: carDetailQuery.data?.brand?.name,
      },
      {
        Model: carDetailQuery.data?.modelId?.name,
      },
      {
        Title: carDetailQuery.data?.titleId?.name,
      },
      {
        "Year of Manufacture": carDetailQuery.data?.year,
      },
      {
        "Registration Year": carDetailQuery.data?.year,
      },
      {
        Condition: "New",
      },
      {
        Transmission: carDetailQuery.data?.transmissionId?.name,
      },
      {
        "Body Type": "SUV / 4x4",
      },
      {
        "Fuel Type": carDetailQuery.data?.fuelTypeId?.name,
      },
      {
        "Engine Capacity": carDetailQuery.data?.engineTypeId?.name,
      },
      {
        Color: carDetailQuery.data?.colorId?.name,
      },
      {
        Cylinder: carDetailQuery.data?.cylinders,
      },
      {
        "Doors count": carDetailQuery.data?.doorsCount,
      },
      {
        Odometer: carDetailQuery.data?.engineTypeId?.name,
      },
      {
        "Country City":
          carDetailQuery.data?.countryId?.name +
          ", " +
          carDetailQuery.data?.cityId?.name,
      },
      {
        Hybrid: carDetailQuery.data?.isHybrid ? " Yes" : " No",
      },
      {
        Electric: carDetailQuery.data?.isElectric ? " Yes" : " No",
      },
    ];
    return (
      <View className="flex gap-[16px] justify-center py-[12px]">
        {data?.map((item, idx) => {
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

  function CarDetails() {
    return (
      <View className="py-[10px] flex gap-4">
        <ThemedText className="text-[#1D2939] text-[20px] font-[600]">
          Details
        </ThemedText>
        {
          <View>
            <ThemedText className="text-[#344054] text-[15px] font-[400]">
              {carDetailQuery.data?.note}
            </ThemedText>
          </View>
        }
      </View>
    );
  }

  return (
    <>
      {true && carDetailQuery.isLoading ? (
        <View className="flex flex-1 items-center justify-center bg-slate-100">
          <View className="h-[110px] ">
            <BarIndicator color={Colors.buttonPrimary} />
            <ThemedText
              style={{
                color: Colors.buttonPrimary,
              }}
              className="text-[17px]"
            >
              Loading...
            </ThemedText>
          </View>
        </View>
      ) : null}

      {carDetailQuery.isSuccess ? (
        <ImageBackground
          style={{ flex: 1, width: width, height: height }}
          resizeMode="cover"
          source={
            carDetailQuery.data?.imagesUrls[0]
              ? { uri: carDetailQuery.data?.imagesUrls[0] }
              : CarData[0].img
          }
          blurRadius={290}
        >
          <View className="flex-1">
            <View className="flex-1 ">
              <View
                onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
              >
                <CustomHeader
                  title={carDetailQuery.data?.name}
                  imageUri={carDetailQuery.data?.imagesUrls[0]}
                  setStatusBarType={setStatusBarType}
                />
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
                  className={`flex-1 pb-[1rem]`}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                >
                  {carDetailQuery.isLoading ? <ImageSliderSkeleton /> : null}
                  {carDetailQuery.isSuccess ? (
                    carDetailQuery.data?.imagesUrls?.length ? (
                      <View
                        style={{
                          width: width,
                          minHeight: 263,
                        }}
                      >
                        <CarImagesSlider
                          Slides={carDetailQuery.data?.imagesUrls}
                          carId={carId}
                        />
                      </View>
                    ) : null
                  ) : null}

                  <View
                    style={{
                      paddingTop: 28,
                      paddingBottom: 60,
                      backgroundColor: colors.backgroundSecondaryVariant,
                    }}
                    className="px-[5%] flex gap-[20px]"
                  >
                    <ThemedText
                      style={{
                        fontFamily: "SpaceGrotesk_600SemiBold",
                      }}
                      className="text-[#1D2939] text-[20px]"
                    >
                      {carDetailQuery.data?.name}
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
                      className={`text-[${colors.background}] text-[28px]`}
                    >
                      ${" "}
                      {carDetailQuery.data?.salesPrice &&
                        thousandSeparator(carDetailQuery.data?.salesPrice)}
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

                    <View ref={detailsRef}>
                      <CarDetails />
                    </View>

                    {carDetailQuery.isSuccess ? (
                      <RelatedCar carId={carId} />
                    ) : null}
                    {/* <View
                    style={{
                      height: +selectedElmHeight,
                    }}
                  ></View> */}
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
                  className={`bg-[${colors.background}] p-[12px_20px] rounded-[12px] border border-solid border-[${colors.background}]`}
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
              <ContactDealer handleCloseModal={handleCloseModal} />
            </CustomBottomSheetModal>
          </View>
        </ImageBackground>
      ) : null}

      {carDetailQuery.isError ? (
        <ErrorLoadingData refetch={carDetailQuery.refetch} />
      ) : null}

      {statusBarType === "dark" ? <StatusBar style="dark" translucent /> : null}
      {statusBarType === "light" ? (
        <StatusBar style="light" translucent />
      ) : null}
    </>
  );
}

function CarInformationButtons({
  handleSpecificationsView,
  handleDetailsView,
  selected,
}: {
  handleSpecificationsView: () => void;
  handleDetailsView: () => void;
  selected: string;
}) {
  return (
    <View className="flex-row items-center justify-between gap-[8px]">
      <TouchableOpacity
        onPress={handleSpecificationsView}
        style={{
          flex: 0.5,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: selected === "Specifications" ? "#5856D6" : "#EAECF0",
        }}
        className="flex items-center justify-center"
      >
        <ThemedText
          style={{
            color: selected === "Specifications" ? "#5856D6" : "#101828",
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
        }}
        className="flex items-center justify-center"
      >
        <ThemedText
          style={{
            color: selected === "Details" ? "#5856D6" : "#101828",
          }}
          className="p-[10px_20px] text-[16px]"
        >
          Details
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

function ContactDealer({ handleCloseModal }: { handleCloseModal: () => void }) {
  return (
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
          <TouchableOpacity
            onPress={() => openWhatsApp()}
            className="flex-row  items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full"
          >
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
          <TouchableOpacity
            onPress={() => openTelegram()}
            className="flex-row  items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full"
          >
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
          <TouchableOpacity
            onPress={() => makePhoneCall()}
            className="flex-row items-center justify-center gap-[12px] w-full p-[12px_32px] border border-solid border-[#D8DADC] rounded-full"
          >
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
          * Keep your communication private. Avoid sharing sensitive information
          with the seller.
        </ThemedText>
      </View>
    </View>
  );
}

function CustomHeader({
  title,
  imageUri,
  setStatusBarType,
}: {
  title?: string;
  imageUri?: string;
  setStatusBarType: (color: string) => void;
}) {
  const { carId }: { carId: string } = useLocalSearchParams();

  if (!carId) return;

  const isCarSavedQuery = useQuery({
    queryKey: ["check-car-saved", carId],
    queryFn: () =>
      isCarSaved({
        carId: carId,
        userId: "66d08d69f683984aa2acef6f",
      }),
  });

  const queryClient = useQueryClient();

  const handleLike = async () => {
    if (!isCarSavedQuery.isSuccess || isCarSavedQuery.isError) {
      return;
    }
    if (isCarSavedQuery.data?.isCarSaved) {
      await unSaveSingleCar({ carId, userId: "66d08d69f683984aa2acef6f" });
    } else {
      await saveSingleCar({ carId, userId: "66d08d69f683984aa2acef6f" });
    }
    // refetch current car state
    queryClient.invalidateQueries({
      queryKey: ["check-car-saved", carId],
      exact: true,
    });

    // refetch saved cars id
    queryClient.invalidateQueries({
      queryKey: ["get-saved-cars"],
      exact: true,
    });

    // refetch saved cars data
    queryClient.invalidateQueries({
      queryKey: ["get-saved-cars-list"],
      exact: true,
    });
  };

  const handleShare = () => {};

  // Fetch prominent headerColors from an image.

  const [headerColors, setHeaderColors] = useState<{
    dominant: string;
  }>({ dominant: "" });
  const [textColor, setTextColor] = useState<string>("");

  // Function to calculate luminance
  const getLuminance = (hex: string): number => {
    // Convert hex to RGB
    const rgb = parseInt(hex.replace("#", ""), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Standard formula for relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  };

  useEffect(() => {
    const url: string = imageUri || "";

    if (url) {
      getColors(url, {
        fallback: "#C8C8D0",
        cache: true,
        key: url,
      })
        .then((color) => {
          setHeaderColors(color);
          const luminance = getLuminance(color["dominant"]);
          // Check if the dominant color is light or dark and set the text color
          if (luminance > 128) {
            // Light dominant color -> use dark text
            setTextColor("#1D2939");
            setStatusBarType("dark");
          } else {
            // Dark dominant color -> use light text
            setTextColor("#EFEFEF");
            setStatusBarType("light");
          }
        })
        .catch((e) => {
          console.log(e, "Error fetching image headerColors");
        });
    }
  }, [imageUri]);

  // console.log(headerColors, "headerColors");
  return (
    <Header
      className=" px-[5%]"
      style={{
        backgroundColor: headerColors["dominant"],
      }}
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
          <ThemedText
            style={{
              color: textColor,
            }}
            className=" text-[20px] font-[600] mr-1"
          >
            {title?.length > 18 ? title?.slice(0, 18) + "..." : title}
          </ThemedText>
        </View>
        <View className="flex-row items-center justify-center gap-[10px]">
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
              color={
                isCarSavedQuery.isSuccess && isCarSavedQuery.data?.isCarSaved
                  ? colors.background
                  : "black"
              }
              variant={
                isCarSavedQuery.isSuccess && isCarSavedQuery.data?.isCarSaved
                  ? "Bold"
                  : "Linear"
              }
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
  style,
  ...rest
}: PropsWithChildren & ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={` ${className}`}
      style={{ paddingTop: insets.top, ...style }}
      {...rest}
    >
      <StatusBar style="dark" translucent />
      {children}
    </View>
  );
};
