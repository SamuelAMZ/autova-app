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
import { Heart } from "iconsax-react-native";
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
import { shareCarApp } from "@/utils/shareCarLink";
import { useTranslation } from "react-i18next";
import { getLangage } from "@/localization/i18n";

export default function CarDetail() {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["55%", "60%", "90%"], []);

  const [selected, setSelected] = useState("Specifications");
  const scrollViewRef = useRef<ScrollView>(null);
  const specificationsRef = useRef<View>(null);
  const detailsRef = useRef<View>(null);
  const [selectedElmHeight, setSelectedElementHeightValue] = useState(0);
  const [langage, setLangage] = useState("en");

  useEffect(() => {
    getLangage()
      .then((langage) => setLangage(langage))
      .catch((e) => {
        console.log(e, "useffect getlangage");
        setLangage("en");
      });
  }, []);

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
    const { t } = useTranslation(); // Hook to use translations

    const data = [
      {
        [t("screens.carDetail.keys.Brand")]: carDetailQuery.data?.brand?.name,
      },
      {
        [t("screens.carDetail.keys.Model")]: carDetailQuery.data?.model?.name,
      },
      {
        [t("screens.carDetail.keys.Title")]: carDetailQuery.data?.title?.name,
      },
      {
        [t("screens.carDetail.keys.Year")]: carDetailQuery.data?.year,
      },
      {
        [t("screens.carDetail.keys.Transmission")]:
          carDetailQuery.data?.transmission?.name,
      },
      {
        [t("screens.carDetail.keys.FuelType")]:
          carDetailQuery.data?.fuelType?.name,
      },
      {
        [t("screens.carDetail.keys.EngineCapacity")]:
          carDetailQuery.data?.engineType?.name,
      },
      {
        [t("screens.carDetail.keys.Color")]: carDetailQuery.data?.color?.name,
      },
      {
        [t("screens.carDetail.keys.Cylinder")]: carDetailQuery.data?.cylinders,
      },
      {
        [t("screens.carDetail.keys.Doorscount")]:
          carDetailQuery.data?.doorsCount,
      },
      {
        [t("screens.carDetail.keys.Odometer")]:
          carDetailQuery.data?.engineType?.name,
      },
      {
        [t("screens.carDetail.keys.CountryCity")]:
          carDetailQuery.data?.country?.name +
          ", " +
          carDetailQuery.data?.city?.name,
      },
      {
        [t("screens.carDetail.keys.Hybrid")]: carDetailQuery.data?.isHybrid
          ? langage === "en"
            ? "Yes"
            : "Oui"
          : langage === "en"
          ? "No"
          : "Non",
      },
      {
        [t("screens.carDetail.keys.Electric")]: carDetailQuery.data?.isElectric
          ? langage === "en"
            ? "Yes"
            : "Oui"
          : langage === "en"
          ? "No"
          : "Non",
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

  function CarDetails({ lng }: { lng: string }) {
    const { t } = useTranslation();
    return (
      <View className="py-[10px] flex gap-4">
        <ThemedText className="text-[#1D2939] text-[20px] font-[600]">
          {t("screens.carDetail.textDetails")}
        </ThemedText>

        <View>
          <ThemedText className="text-[#344054] text-[15px] font-[400]">
            {langage === "en" && carDetailQuery.data?.note_en
              ? carDetailQuery.data?.note_en
              : null}

            {langage === "fr" && carDetailQuery.data?.note_fr
              ? carDetailQuery.data?.note_fr
              : null}
            {!carDetailQuery.data?.note_en && !carDetailQuery.data?.note_fr
              ? carDetailQuery.data?.note
              : null}
          </ThemedText>
        </View>
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
              {t("screens.carDetail.textLoading")}...
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
              : CarData[0]?.img
          }
          blurRadius={290}
        >
          <View className="flex-1">
            <View className="flex-1 ">
              <View
                onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
              >
                <CustomHeader title={carDetailQuery.data?.name} />
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
                      numberOfLines={1}
                      style={{
                        fontFamily: "SpaceGrotesk_600SemiBold",
                      }}
                      className="text-[#1D2939] text-[20px]"
                    >
                      {langage === "en" && carDetailQuery.data?.name_en
                        ? carDetailQuery.data?.name_en
                        : null}

                      {langage === "fr" && carDetailQuery.data?.name_fr
                        ? carDetailQuery.data?.name_fr
                        : null}
                      {!carDetailQuery.data?.name_en &&
                      !carDetailQuery.data?.name_fr
                        ? carDetailQuery.data?.name
                        : null}
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
                      <CarDetails lng={langage} />
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
                    {t("screens.carDetail.contactDealer.header.title")}
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
  const { t } = useTranslation();
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
          {t("screens.carDetail.textSpecifications")}
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
          {t("screens.carDetail.textDetails")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

function ContactDealer({ handleCloseModal }: { handleCloseModal: () => void }) {
  const { t } = useTranslation();
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
          {t("screens.carDetail.contactDealer.header.title")}
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
          {t("screens.carDetail.contactDealer.contactOptions.prompt")}
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
              {t(
                "screens.carDetail.contactDealer.contactOptions.whatsapp.label"
              )}
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
              {t(
                "screens.carDetail.contactDealer.contactOptions.telegram.label"
              )}
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
              {t(
                "screens.carDetail.contactDealer.contactOptions.phoneCall.label"
              )}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText className="text-[#101828] text-[14px] font-[400] text-center text-clip">
          {t("screens.carDetail.contactDealer.privacyNotice")}
        </ThemedText>
      </View>
    </View>
  );
}

function CustomHeader({ title }: { title?: string }) {
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

  // Modify the handleShare function
  const handleShare = async () => {
    shareCarApp({ carId: carId });
  };

  return (
    <Header
      className=" px-[5%]"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View className="flex-row   justify-between items-center py-[18px]">
        <View className="flex-row w-[70%]   justify-start items-center gap-[13px] ">
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
          <View className="w-[80%]">
            <ThemedText
              numberOfLines={1}
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
                color: colors.textPrimary,
              }}
              className=" text-[20px] font-[600] mr-1"
            >
              {title}
            </ThemedText>
          </View>
        </View>
        <View className="flex-row  items-center justify-center gap-[10px]">
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
      <StatusBar style="light" translucent />
      {children}
    </View>
  );
};
