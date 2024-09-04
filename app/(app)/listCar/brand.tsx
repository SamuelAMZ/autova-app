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
import { loadBrands } from "@/utils/brandsRequest";
import { useQuery } from "@tanstack/react-query";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import { BrandItemSkeleton } from "@/components/skeleton/BrandItemSkeleton";

export default function Brand() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: loadBrands,
  });

   // Filtre les modèles en fonction de la recherche
   const filteredBrands = brandQuery?.data?.data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HeaderListing progress={2 / 14}>
        <ListingCarHeader />
      </HeaderListing>
      <View
        className="flex   bg-[#fff] justify-between h-[90%] "
        style={{ paddingTop: 30, paddingBottom: 60 }}>
        <ScrollView className="flex pb-[80px] relative px-[16px]">
          <View className="flex items-start gap-[12px] mb-[30px] ">
            <ThemedText
              className="text-[#101828] text-[20px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Brand
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}>
              Select a brand for your car
            </ThemedText>
          </View>
          <View className="relative">
            <SearchNormal1
              size="20"
              color="#000"
              style={{ position: "absolute", right: 20, top: 15 }}
            />
            <TextInput
              className="bg-[#7878801F] relative border border-[#D0D5DD] py-[12px] px-[20px] rounded-[12px] mb-[30px]"
              placeholder="Search a brand"
              placeholderTextColor="#1D2939"
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <View className="flex gap-[20px] mb-[30px]">
            <ThemedText
              className="text-[17px]  font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Popular Brand
            </ThemedText>
            {brandQuery.isLoading ? (
              <View className="w-full ">
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
              <View className="w-full px-4">
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={filteredBrands}
                  renderItem={({ item }) => (
                    <BrandItem size={70} onPress={() => {}} brand={item} />
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
          </View>
          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px]  font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Popular Brand
            </ThemedText>

            <View className="">
              {filteredBrands.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleSelect(item._id)}
                  className="flex items-center border-b border-[#EAECF0] flex-row w-full justify-between">
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
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            paddingBottom: 20,
          }}
          className="px-[16px]">
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: "./Model",
                params: {
                  brandId: selectedDegree,
                },
              });
            }}
            className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%] mt-[10px]`}>
            <ThemedText
              className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
