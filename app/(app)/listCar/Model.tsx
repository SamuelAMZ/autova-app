import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { SearchNormal1 } from "iconsax-react-native";
import { router, useLocalSearchParams } from "expo-router";
import HeaderListing from "@/components/HeaderListing";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import ListingCarHeader from "@/components/ListingCarHeader";
import { loadModels } from "@/utils/modelsRequest";
import { useQuery } from "@tanstack/react-query";
import { useProduct } from "@/context/carContext";
import { useTranslation } from "react-i18next";

export default function Model() {
  const { t } = useTranslation();
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { updateProductData, productData } = useProduct();

  const handleBrandSelect = () => {
    updateProductData({ model: selectedDegree });
    router.navigate("./title");
  };

  const handleSelect = (degree: string) => {
    setSelectedDegree(degree);
  };

  const { brand }: { brand: string } = useLocalSearchParams();

  console.log(brand);

  const ModelQuery = useQuery({
    queryKey: ["models"],
    queryFn: loadModels,
  });

  console.log(ModelQuery?.data?.data);

  const Models = ModelQuery?.data?.data.filter(
    (item: { brand: { _id: string } }) => item.brand._id === brand
  );

  if (!Models) {
    return null;
  }

  console.log(Models);
  // Filtre les modèles en fonction de la recherche
  const filteredModels = Models.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HeaderListing progress={3 / 14}>
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
              {t("screens.model.title")}
            </ThemedText>
            <ThemedText
              className="text-[#344054] text-[16px]"
              style={{ fontFamily: "SpaceGrotesk_500Medium" }}
            >
              {t("screens.model.subtitle")}
            </ThemedText>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={110}
          >
            <View className="relative flex-1 flex-row items-center justify-between bg-[#7878801F] border border-[#D0D5DD] pl-[20px] pr-[12px] rounded-[12px] mb-[30px]">
              <TextInput
                className="w-full py-[13px]"
                placeholder={t("screens.model.searchPlaceholder")}
                placeholderTextColor="#1D2939"
                onChangeText={(text) => setSearch(text)}
              />
              <View style={{ position: "absolute", right: 15, top: 10 }}>
                <SearchNormal1 size="20" color="#000" />
              </View>
            </View>
          </KeyboardAvoidingView>

          <View className="flex gap-[20px]">
            <ThemedText
              className="text-[17px] font-[600] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              {t("screens.model.allModels")}
            </ThemedText>

            <View className="">
              {filteredModels?.map(
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
              {t("screens.model.continue")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
