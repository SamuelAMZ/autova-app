import { SearchNormal1 } from "iconsax-react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import AppIcon from "@/assets/icons/autova-logo-white.svg";
import { router, useFocusEffect, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import BrandItem from "@/components/BrandItem";
import CarHome from "@/components/cars/CarHome";
import ThemedText from "@/components/ThemedText";
import SearchCard from "@/components/searchCard/SearchCard";
import { HorizontalSeperator, VerticalSeperator } from "@/components/Separator";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";

import { loadBrands } from "@/utils/brandsRequest";
import { BrandItemSkeleton } from "@/components/skeleton/BrandItemSkeleton";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import { initialFilterData } from "@/constants";
import HomeIndicator from "@/components/HomeIndicator";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ["70%", "80%", "90%"], []);
  const [shwoHomeIndicator, setShowHomeIndicator] = useState(true);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // load brands
  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: loadBrands,
  });
  useFocusEffect(
    useCallback(() => {
      if (shwoHomeIndicator) {
        navigation.setOptions({
          tabBarStyle: { display: "none" },
        });

        const timeoutId = setTimeout(() => {
          setShowHomeIndicator(false);
        }, 2000); // 2s

        if (brandQuery.isSuccess) {
          clearTimeout(timeoutId);
          setShowHomeIndicator(false);
        }
        // Cleanup timeout on unmount
        return () => clearTimeout(timeoutId);
      } else {
        navigation.setOptions({
          tabBarStyle: {
            display: "flex",
            height: Platform.OS === "android" ? 60 : 90,
          },
        });
      }
    }, [shwoHomeIndicator])
  );

  return (
    <>
      {shwoHomeIndicator ? (
        <HomeIndicator />
      ) : (
        <View className={`flex-1 bg-[${Colors.background}]`}>
          <View
            style={{ paddingTop: insets.top + 10, paddingBottom: 20 }}
            className="px-4 w-full flex-row items-center justify-between"
          >
            <View className="items-center flex-row">
              <AppIcon height={30} width={150} />
            </View>
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/(app)/search/carSearch",
                  params: { isFocusable: "true" },
                })
              }
              className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
            >
              <SearchNormal1 size="20" color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="w-full px-[16px] pb-[30px]">
              <SearchCard />
            </View>

            <View className="flex-grow flex bg-white">
              <View className="px-[4%] flex-row justify-between pt-[30px] mb-[30px]">
                <ThemedText
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                  }}
                  className="font-semibold text-[18px]"
                >
                  {t("components.brands.title")}
                </ThemedText>
                <TouchableOpacity onPress={handlePresentModalPress}>
                  <ThemedText className="text-[#007AFF] font-medium">
                    {t("components.brands.viewAll")}
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* Brands Items */}
              {brandQuery.isLoading ? (
                <View className="w-full px-4 mb-[30px]">
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={Array.from({ length: 10 })}
                    renderItem={() => <BrandItemSkeleton />}
                    ItemSeparatorComponent={() => (
                      <HorizontalSeperator size={16} />
                    )}
                  />
                </View>
              ) : null}
              {brandQuery.isSuccess ? (
                <View className="w-full px-4  mb-[30px]">
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={brandQuery?.data?.data}
                    renderItem={({ item }) => (
                      <BrandItem
                        size={70}
                        onPress={() => {
                          router.navigate({
                            pathname: "/(app)/search/carSearch",
                            params: {
                              searchData: JSON.stringify({
                                ...initialFilterData,
                                selectedMake: item,
                              }),
                            },
                          });
                        }}
                        brand={item}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <HorizontalSeperator size={16} />
                    )}
                  />
                </View>
              ) : null}

              {brandQuery.isError ? (
                <ErrorLoadingData refetch={brandQuery.refetch} />
              ) : null}

              <View className="px-[4%]">
                <CarHome />
              </View>
            </View>
          </ScrollView>

          <CustomBottomSheetModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            snapPoints={snapPoints}
            index={1}
          >
            <View
              style={{
                paddingTop: 14,
                paddingBottom: 30,
              }}
              className="w-full flex-row justify-between items-center px-4"
            >
              <ThemedText
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
                className="font-semibold text-[18px]"
              >
                {t("components.brands.bottomSheet.title")}
              </ThemedText>
              <TouchableOpacity onPress={handleCloseModal}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            {brandQuery.isLoading ? (
              <FlatList
                data={Array.from({ length: 8 })}
                numColumns={4}
                keyExtractor={(item, index) => "#" + index}
                renderItem={() => <BrandItemSkeleton />}
                ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
              />
            ) : null}
            {brandQuery.isSuccess ? (
              <View className="w-full px-4">
                <FlatList
                  data={brandQuery?.data?.data}
                  numColumns={4}
                  keyExtractor={(item, index) => "#" + index}
                  renderItem={({ item }) => (
                    <View className="mr-7">
                      <BrandItem
                        size={70}
                        onPress={() => {
                          handleCloseModal();
                          router.navigate({
                            pathname: "/(app)/search/carSearch",
                            params: {
                              searchData: JSON.stringify({
                                ...initialFilterData,
                                selectedMake: item,
                              }),
                            },
                          });
                        }}
                        brand={item}
                      />
                    </View>
                  )}
                  ItemSeparatorComponent={() => <VerticalSeperator size={12} />}
                />
              </View>
            ) : null}

            {brandQuery.isError ? (
              <ErrorLoadingData refetch={brandQuery.refetch} />
            ) : null}
          </CustomBottomSheetModal>

          <StatusBar style="light" translucent />
        </View>
      )}
    </>
  );
};

export default HomePage;
