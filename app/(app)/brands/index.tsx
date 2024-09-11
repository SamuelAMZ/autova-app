import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";

import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";

import CarItem from "@/components/cars/CarItem";
import Colors from "@/constants/Colors";
import { filterCars, loadCars } from "@/utils/carRequest";
import { useQuery } from "@tanstack/react-query";
import { getSavedCar } from "@/utils/carRequest";
import { initialFilterData } from "@/constants";
import { CarItemSkeleton } from "@/components/skeleton/CarItemSkeleton";
import NoCarFound from "@/components/cars/__NoCarFound";

export default function BrandCars() {
  const { _id, name }: { _id: string; name: string } = useLocalSearchParams();
  // load brands
  const {
    data: listingCarsQuery,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["listing-cars"],
    queryFn: () => {
      return filterCars({
        ...initialFilterData,
        selectedMake: { _id, name },
      });
    },
  });

  const getSavedCarsQuery = useQuery({
    queryKey: ["get-saved-cars"],
    queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  });

  return (
    <View className={`flex-1 bg-[${Colors.backgroundSecondaryVariant}]`}>
      <CustomHeader title={name} />
      {isLoading ? (
        <FlatList
          data={Array.from({ length: 5 })}
          renderItem={({ item }) => <CarItemSkeleton />}
          ItemSeparatorComponent={() => (
            <View style={{ height: Platform.OS === "ios" ? 2 : 16 }} />
          )}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 60 }} />}
        />
      ) : listingCarsQuery.length > 0 ? (
        <FlatList
          className="px-[4%] mt-4"
          data={listingCarsQuery}
          renderItem={({ item }) => (
            <CarItem
              car={item}
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
          ItemSeparatorComponent={() => (
            <View style={{ height: Platform.OS === "ios" ? 2 : 16 }} />
          )}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={5}
          ListFooterComponent={() => <View style={{ height: 60 }} />}
        />
      ) : (
        <NoCarFound handleRefresh={() => refetch()} />
      )}
    </View>
  );
}

function CustomHeader({ title }: { title?: string }) {
  return (
    <Header>
      <View
        className={`flex-row justify-start items-center gap-[13px] px-[4%] py-[16px]`}
      >
        <TouchableOpacity
          className={`h-auto rounded-[100px] max-w-11 flex flex-row items-center justify-center bg-[${Colors.buttonSecondary}] p-[11px]`}
          onPress={() => router.back()}
        >
          <ArrowLeft size={18} variant="Outline" color={Colors.textPrimary} />
        </TouchableOpacity>
        <ThemedText
          className={`text-[${Colors.textPrimary}] text-[20px] font-[600]`}
        >
          {title} Brand Cars
        </ThemedText>
      </View>
    </Header>
  );
}
