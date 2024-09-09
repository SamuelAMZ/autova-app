import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Notification, Gps } from "iconsax-react-native";
import { router } from "expo-router";
import CarItem from "@/components/cars/CarItem";
import { CarData } from "@/constants/CarData";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { loadCars } from "@/utils/carRequest";
import { getSavedCar } from "@/utils/carRequest";

export default function MyListing() {
  const listingCarsQuery = useQuery({
    queryKey: ["listing-cars"],
    queryFn: () => loadCars({ page: 1 }),
  });

  const getSavedCarsQuery = useQuery({
    queryKey: ["get-saved-cars"],
    queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  });

  // console.log(
  //   JSON.stringify(listingCarsQuery?.data?.data, null, 2),
  //   "listingCarsQuery"
  // );
  return (
    <>
      <CustomHeader />
      <ScrollView className="flex-1 px-[16px] py-[30px] bg-[#fff] ">
        <View className="flex  justify-center gap-[30px]">
          <View className="bg-[#F9FAFB] p-[16px] rounded-[16px] drop-shadow-md  w-full gap-[16px]">
            <ThemedText
              className="text-[18px] text-[#101828]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              List cars for free
            </ThemedText>
            <View className="flex gap-[16px] relative">
              <Gps
                size="24"
                color="#1D2939"
                style={{
                  position: "absolute",
                  right: 20,
                  top: Platform.OS === "android" ? 15 : 10,
                }}
              />
              <TextInput
                className={`bg-[#7878801F] relative border border-[${Colors.background}] py-[12px] px-[20px] rounded-[12px]`}
                placeholder="Enter ZIP code"
                placeholderTextColor="#1D2939"
              />
              <TouchableOpacity
                onPress={() => {
                  router.navigate("../../condition");
                }}
                className={`bg-[${Colors.background}] px-[20px] py-[14px] rounded-[12px] w-[100%]`}
              >
                <ThemedText
                  className={`text-[17px] text-center font-[600] text-[${Colors.textPrimary}]`}
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                >
                  Continue
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex items-start justify-start gap-[20px] w-full pb-[80px]">
            <ThemedText
              className="text-[20px] text-[#101828] "
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              My Listings
            </ThemedText>
            <FlatList
              className="w-full"
              data={listingCarsQuery?.data?.data}
              renderItem={({ index, item }) => (
                <CarItem
                  car={listingCarsQuery?.data?.data[0]}
                  savedCarsId={getSavedCarsQuery.data?.carsId || []}
                  onPress={() => {
                    router.navigate({
                      pathname: "/(app)/brands/carDetail",
                      params: {
                        carId: item._id,
                      },
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function CustomHeader() {
  return (
    <>
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className={`text-[${Colors.textPrimary}] text-[22px]`}
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Listing
          </ThemedText>
          <View
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
          >
            <Notification color={Colors.textPrimary} size={20} />
          </View>
        </View>
      </Header>
    </>
  );
}
