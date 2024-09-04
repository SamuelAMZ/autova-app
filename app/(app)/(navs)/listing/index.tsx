import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import {
  Notification,
  Gps,
  Add,
  Car,
  ArrowDown2,
  SearchNormal,
  Setting5,
} from "iconsax-react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { CarData } from "@/constants/CarData";
import Colors from "@/constants/Colors";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import CustomButton from "@/components/CustomButton";
import BodyStylesSearch from "@/components/searchCard/bodyStyleSearch";
import MakeModelsSearch from "@/components/searchCard/makeModelSearch";
import PriceRangeSearch from "@/components/searchCard/priceRangeSearch";
import { AntDesign } from "@expo/vector-icons";
import {
  defaultRangeHighValue,
  defaultRangeLowValue,
  initialFilterData,
} from "@/constants";
import CarItem from "@/components/cars/CarItem";
import { CarItemSkeleton } from "@/components/skeleton/CarItemSkeleton";
import { loadCars } from "@/utils/carRequest";
import { useQuery } from "@tanstack/react-query";
import { ErrorLoadingData } from "@/components/ErrorLoading";

const initialItemIsOpen = {
  makeModel: true,
  priceRange: true,
  bodyStyle: true,
};

export default function MyListing() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["90%", "92%"], []);
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);
  const [usedFilter, setUsedFilter] = useState<number>(0);
  const [itemIsOpen, setItemIsOpen] = useState<any>(initialItemIsOpen);

  const handleOpenItem = (type: string) => {
    setItemIsOpen({ ...itemIsOpen, [`${type}`]: !itemIsOpen[`${type}`] });
  };

  // Make & Model Props change
  const handleMakeModalChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type == "models") {
      setFilterData({ ...filterData, ["selectedModelItem"]: item });
    } else {
      setFilterData({ ...filterData, ["selectedMakeItem"]: item });
    }
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    setFilterData((prevData) => ({
      ...prevData,
      rangeValue: { low, high },
    }));
  };

  // Body Styles props change
  const handleBodyStyleChange = (item: ItemDataProps | number | undefined) => {
    if (typeof item == "number") {
      setFilterData({ ...filterData, ["carDoors"]: item });
    } else {
      setFilterData({ ...filterData, ["selectedBodyItem"]: item });
    }
  };

  // Reset filter
  const onReset = () => {
    setFilterData(initialFilterData);
  };

  // callbacks
  const handlePresentModalPress = () => {
    setIsModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //
  useEffect(() => {
    const makeCount = filterData.selectedMakeItem != undefined ? 1 : 0;
    const modelCount = filterData.selectedModelItem != undefined ? 1 : 0;
    const rangeHigh =
      filterData.rangeValue.high != defaultRangeHighValue ? 0.5 : 0;
    const rangeLow =
      filterData.rangeValue.low != defaultRangeLowValue ? 0.5 : 0;
    const carDoorsCount = filterData.carDoors != 0 ? 1 : 0;
    const bodyStyleCount = filterData.selectedBodyItem != undefined ? 1 : 0;
    const priceRange = rangeHigh + rangeLow > 0 ? 1 : 0;
    setUsedFilter(
      makeCount + modelCount + priceRange + carDoorsCount + bodyStyleCount
    );
  }, [filterData]);

  // load brands
  const listingCarsQuery = useQuery({
    queryKey: ["listing-cars"],
    queryFn: loadCars,
  });

  console.log(
    JSON.stringify(listingCarsQuery?.data?.data, null, 2),
    "listingCarsQuery"
  );

  return (
    <>
      <CustomHeader />
      <ScrollView
        className={`flex-1 pt-2 bg-[${Colors.backgroundSecondaryVariant}]`}
      >
        <View className="px-4 my-5 flex-row gap-3">
          <View
            className={`flex-1 flex-row items-center gap-2 px-4 h-[48px] border border-[${Colors.borderPrimary}] rounded-xl`}
          >
            <SearchNormal color={Colors.textQuinary} />
            <TextInput
              className="flex-1"
              placeholder="Search..."
              placeholderTextColor="#000"
              // ref={textIinputRef}
            />
          </View>
          <TouchableOpacity
            onPress={handlePresentModalPress}
            className={`justify-center items-center border h-[48px] w-[48px] border-[${Colors.borderPrimary}] rounded-xl relative`}
          >
            <Setting5 color={Colors.textQuinary} />
            {usedFilter != 0 && usedFilter != undefined && (
              <View
                className={`absolute bg-[${Colors.background}] h-[24] w-[25] rounded-2xl top-[-8] right-[-8] items-center justify-center`}
              >
                <ThemedText className="text-white"> {usedFilter} </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {listingCarsQuery.isLoading ? (
          <FlatList
            className="px-[4%]"
            data={Array.from({ length: 10 })}
            renderItem={() => <CarItemSkeleton />}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        ) : null}
        {listingCarsQuery.isSuccess ? (
          <FlatList
            className="px-[4%]"
            data={listingCarsQuery?.data?.data}
            renderItem={({ item }) => (
              <CarItem
                car={item}
                onPress={() => {
                  router.navigate({
                    pathname: "/(app)/brands/carDetail",
                    params: {
                      carId: item?._id,
                    },
                  });
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        ) : null}
        {listingCarsQuery.isError ? (
          <ErrorLoadingData refetch={listingCarsQuery.refetch} />
        ) : null}
      </ScrollView>
      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        snapPoints={snapPoints}
        index={1}
      >
        <KeyboardAvoidingView className="flex-1">
          <View className="flex-1 w-full z-0">
            <View className="py-5 px-[4%] flex-row justify-between items-center ">
              <ThemedText
                className={`text-[20px] font-[600] text-[${Colors.textSenary}]`}
              >
                Filter Search
              </ThemedText>
              <TouchableOpacity onPress={handleCloseModal}>
                <View
                  className={`bg-[${Colors.backgroundTertiary}] rounded-full p-[6px]`}
                >
                  <AntDesign
                    name="close"
                    size={16}
                    color={Colors.iconPrimary}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              className={`flex-1 bg-[${Colors.backgroundQuaternary}] p2-3 px-4 w-full`}
            >
              <OpenCloseItem
                title="Make & Model"
                onPress={() => handleOpenItem("makeModel")}
              />
              {itemIsOpen.makeModel && (
                <MakeModelsSearch
                  selectedModelItem={filterData.selectedModelItem}
                  selectedMakeItem={filterData.selectedMakeItem}
                  onChange={handleMakeModalChange}
                />
              )}

              {/* Price Range */}
              <OpenCloseItem
                title="Price Range"
                onPress={() => handleOpenItem("priceRange")}
              />
              <View className="z-20">
                {itemIsOpen.priceRange && (
                  <PriceRangeSearch
                    style={{ zIndex: 30 }}
                    rangeValue={filterData.rangeValue}
                    onValueChange={handlePriceRangeChange}
                  />
                )}
              </View>

              {/* Body Styles */}
              <OpenCloseItem
                title="Body Styles"
                onPress={() => handleOpenItem("bodyStyle")}
              />
              {itemIsOpen.bodyStyle && (
                <BodyStylesSearch
                  selectedItem={filterData.selectedBodyItem}
                  carDoors={filterData.carDoors}
                  onBodyValueChange={handleBodyStyleChange}
                />
              )}
            </View>
            <View
              style={{ bottom: Platform.OS == "ios" ? 40 : 30 }}
              className="px-4 flex-row mt-4 gap-3 absolute self-center"
            >
              <View className="flex-1">
                <CustomButton onPress={() => {}} title={"Search"} />
              </View>
              <TouchableOpacity
                onPress={() => onReset()}
                className="h-[48] w-[48] bg-[red] rounded-xl justify-center items-center"
              >
                <Icon name="close" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </CustomBottomSheetModal>
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
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(app)/listCar/condition");
            }}
            className={`justify-center items-center w-[40] h-[40] bg-[${Colors.buttonSecondary}] rounded-3xl`}
          >
            <Add size="28" color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </Header>
    </>
  );
}

const OpenCloseItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full flex-row items-center justify-between my-4"
    >
      <ThemedText
        className={`text-[${Colors.textSecondary}] font-semibold text-[16px] `}
      >
        {title}
      </ThemedText>
      <ArrowDown2 variant="Bold" color="#101828" size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // Different borders for each side
    borderTopWidth: 1,
    borderTopColor: "#0000001D",
    borderRightWidth: 1.5,
    borderRightColor: "#0000001D",
    borderBottomWidth: 2.5,
    borderBottomColor: "#0000001D",
    borderLeftWidth: 1.5,
    borderLeftColor: "#0000001D",
  },
});
