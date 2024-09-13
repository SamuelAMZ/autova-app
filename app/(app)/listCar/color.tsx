import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { SearchNormal1 } from "iconsax-react-native";
import { router } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { loadColors } from "@/utils/colorsRequest";
import { useQuery } from "@tanstack/react-query";
import { useProduct } from "@/context/carContext";
import { useTranslation } from "react-i18next";

export default function Color() {
  const { t } = useTranslation();
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ color: selectedDegree });
    router.navigate({
      pathname: "./city",
    });
  };

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const colorQuery = useQuery({
    queryKey: ["colors"],
    queryFn: loadColors,
  });

  // Filtre les modèles en fonction de la recherche
  const filteredColors = colorQuery?.data?.data?.filter(
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
              {t("screens.color.title")}
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              {t("screens.color.subtitle")}
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
              placeholder={t("screens.color.placeholder")}
              placeholderTextColor="#1D2939"
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px] font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.color.popular")}
            </ThemedText>

            <View>
              {filteredColors?.map(
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
              {t("screens.color.continue")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
