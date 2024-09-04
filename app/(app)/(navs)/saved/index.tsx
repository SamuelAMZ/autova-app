import { CollectionItem } from "@/components/collection";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { Add, InfoCircle } from "iconsax-react-native";
import React from "react";
import Car from "@/models/car.model";
import {
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { SavedCarSkeleton } from "@/components/skeleton/SavedCarSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getSavedCar } from "@/utils/carRequest";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import { refresh } from "@react-native-community/netinfo";

const SavedPage = () => {
  const getSavedCarsQueryList = useQuery({
    queryKey: ["get-saved-cars-list"],
    queryFn: () =>
      getSavedCar({ userId: "66d08d69f683984aa2acef6f", expand: true }),
  });

  // console.log(getSavedCarsQueryList, "getSavedCarsQueryList");
  return (
    <View className="flex-1 bg-white">
      <Header>
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[22px]">
          <ThemedText
            className={`text-[${Colors.textPrimary}] text-[22px]`}
            style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
          >
            Saved
          </ThemedText>
          <TouchableOpacity
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
          >
            <InfoCircle size="20" color="#fff" />
          </TouchableOpacity>
        </View>
      </Header>
      <ScrollView bounces={false} className="px-4">
        <ThemedText
          className=" text-[18px] mt-5"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          My Collection's
        </ThemedText>

        {false ? (
          <FlatList
            className="mt-5 mb-3"
            data={Array.from({ length: 2 })}
            renderItem={() => <SavedCarSkeleton />}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
          />
        ) : (
          <FlatList
            className="mt-5 mb-3"
            data={Array.from({ length: 2 })}
            renderItem={({ item }) => <CollectionItem />}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
          />
        )}

        <TouchableOpacity className="w-full items-center justify-center flex-row p-2">
          <Add color="#007AFF" />
          <ThemedText
            className="text-[#007AFF]"
            style={{ fontFamily: "SpaceGrotesk_700Bold" }}
          >
            New Collection
          </ThemedText>
        </TouchableOpacity>

        <ThemedText
          className=" text-[18px] mt-5"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          Saved Cars
        </ThemedText>

        {getSavedCarsQueryList.isLoading ? (
          <FlatList
            className="mt-5"
            data={Array.from({ length: 5 })}
            renderItem={() => <SavedCarSkeleton />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            ListFooterComponent={() => <View style={{ height: 30 }} />}
          />
        ) : null}

        {getSavedCarsQueryList.isSuccess ? (
          <FlatList
            className="mt-5"
            data={getSavedCarsQueryList.data?.cars}
            renderItem={({ item }) => <SavedCarItem car={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            ListFooterComponent={() => <View style={{ height: 30 }} />}
          />
        ) : null}

        {getSavedCarsQueryList.isError ? (
          <ErrorLoadingData refetch={getSavedCarsQueryList.refetch} />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SavedPage;

const SavedCarItem = ({ car }: { car: Car }) => {
  const date = new Date(car.updatedAt);
  // Get the day of the month
  const day = date.getDate();

  // Get the month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  // Get the hours and format them for 12-hour time
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // if hour is 0, display it as 12

  // Format the string
  const formattedDate = `${day} ${month}, ${hours}:${minutes} ${ampm}`;
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/(app)/brands/carDetail")}
      className="flex-row border border-[#D0D5DD] p-3 gap-3 rounded-xl"
    >
      <Image
        className="w-[80] h-[70] rounded-lg"
        source={
          car.imagesUrls[0]
            ? { uri: car.imagesUrls[0] }
            : require("@/assets/images/audi.png")
        }
      />
      <View className="flex-1 justify-between">
        <ThemedText
          className="text-[#101828]  text-[16px]"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          {car?.name}
        </ThemedText>
        <ThemedText className="text-[#667085]">
          {car?.odometer} miles | {car?.cityId?.name}, {car?.countryId?.name}
        </ThemedText>
        <View className="w-[100%] flex-row justify-between items-center">
          <ThemedText
            className="text-[#5856D6]  text-[16px]"
            style={{ fontFamily: "SpaceGrotesk_700Bold" }}
          >
            ${car?.salesPrice}
          </ThemedText>
          <ThemedText className="text-[#667085]">{formattedDate}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
