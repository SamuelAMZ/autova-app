import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { SearchNormal1 } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import BrandItem from "@/components/BrandItem";
import { carsData } from "@/constants/data";
import { HorizontalSeperator } from "@/components/Separator";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { loadCities } from "@/utils/citiesRequest";
import { useQuery } from "@tanstack/react-query";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import { BrandItemSkeleton } from "@/components/skeleton/BrandItemSkeleton";
import { useProduct } from "@/context/carContext";
import { useTranslation } from "react-i18next";

export default function City() {
  const { t } = useTranslation();
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ city: selectedDegree });
    router.navigate({
      pathname: "./doors",
    });
  };

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const cityQuery = useQuery({
    queryKey: ["cities"],
    queryFn: loadCities,
  });

  // Filtre les modèles en fonction de la recherche
  const filteredCities = cityQuery?.data?.data.filter(
    (item: { name: string }) =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HeaderListing progress={2 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex bg-[#fff] justify-between h-[90%]"
        style={{ paddingTop: 30, paddingBottom: 60 }}
      >
        <ScrollView className="flex pb-[80px] relative px-[16px]">
          <View className="flex items-start gap-[12px] mb-[30px]">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.city.title")}
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              {t("screens.city.subtitle")}
            </ThemedText>
          </View>
          <View className="relative">
            <SearchNormal1
              size="20"
              color="#000"
              style={{ position: "absolute", right: 15, top: 10 }}
            />
            <TextInput
              className="bg-[#7878801F] relative border border-[#D0D5DD] py-[12px] px-[20px] rounded-[12px] mb-[30px]"
              placeholder={t("screens.city.placeholder")}
              placeholderTextColor="#1D2939"
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px] font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.city.cities")}
            </ThemedText>

            <View>
              {filteredCities?.map(
                (item: { _id: string; name: string | number }) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleSelect(item._id)}
                    className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between"
                  >
                    <ThemedText className="py-[16px] text-[#101828] text-[14px]">
                      {item.name}
                    </ThemedText>
                    {selectedDegree === item._id && (
                      <AntDesign
                        name="check"
                        size={20}
                        color={Colors.background}
                      />
                    )}
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            paddingBottom: 20,
          }}
          className="px-[16px]"
        >
          <TouchableOpacity
            onPress={handleBrandSelect}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[10px]`}
          >
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.city.continue")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
