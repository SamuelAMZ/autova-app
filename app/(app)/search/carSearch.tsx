import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowDown2,
  ArrowLeft,
  SearchNormal,
  Setting5,
} from "iconsax-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CarItem from "@/components/cars/CarItem";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import Colors from "@/constants/Colors";
import {
  defaultRangeHighValue,
  defaultRangeLowValue,
  initialFilterData,
} from "@/constants";
import { FilterDataProps, ItemDataProps } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";
import { filterCars, getSavedCar } from "@/utils/carRequest";
import Car from "@/models/car.model";
import { CarItemSkeleton } from "@/components/skeleton/CarItemSkeleton";
import { debounce } from "@/constants/utils";
import NoCarFound from "@/components/cars/__NoCarFound";
import { useTranslation } from "react-i18next";
import FiltersCarComponent from "@/components/cars/FiltersCar";

const initialItemIsOpenData = {
  makeModel: true,
  priceRange: true,
  others: true,
};

const CarSearchScreen = () => {
  const { t } = useTranslation();
  const textIinputRef = useRef(null);
  const { searchData } = useLocalSearchParams();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["90%", "92%"], []);
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);
  const [usedFilter, setUsedFilter] = useState<number>();
  const [itemIsOpen, setItemIsOpen] = useState<any>(initialItemIsOpenData);
  const [initialized, setInitialized] = useState(false);
  const { isFocusable } = useLocalSearchParams();

  //
  useEffect(() => {
    initializeStateData();
  }, []);

  const initializeStateData = async () => {
    const initialData = searchData
      ? JSON.parse(searchData as string)
      : initialFilterData;
    setFilterData(initialData);
    setInitialized(true);
  };

  const [debouncedSearch] = useState(() =>
    debounce((value: string) => {
      // setFilter((prev) => ({ ...prev, search: value }));
      // setPageNumber("1");
      refetchListing();
    }, 500)
  ); // 500ms delay

  const handleSearchValueChange = (value: string) => {
    debouncedSearch(value);
  };

  const {
    data: listingQuery,
    refetch: refetchListing,
    isLoading,
  } = useQuery({
    queryKey: ["filter-cars-key"],
    queryFn: async () => {
      const result = await filterCars({
        ...filterData,
        search: searchInputValue,
      });
      return result;
    },
    enabled: false,
  });

  const getSavedCarsQuery = useQuery({
    queryKey: ["get-saved-cars"],
    queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  });

  useEffect(() => {
    if (initialized) {
      console.log(filterData);
      refetchListing();
    }
  }, [initialized]);

  const handleOpenItem = (type: string) => {
    setItemIsOpen({ ...itemIsOpen, [`${type}`]: !itemIsOpen[`${type}`] });
  };

  // Make & Model Props change
  const handleMakeModalChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type != undefined && type == "models") {
      setFilterData({ ...filterData, ["selectedModel"]: item });
    } else {
      setFilterData({ ...filterData, ["selectedMake"]: item });
    }
  };

  // Engine Type & Transmission Props change
  const handleEngTransChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type != undefined && type == "transmissions") {
      setFilterData({ ...filterData, ["selectedTransmission"]: item });
    } else {
      setFilterData({ ...filterData, ["selectedEngineType"]: item });
    }
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    setFilterData((prevData) => ({
      ...prevData,
      rangeValue: { low, high },
    }));
  };

  // Reset filter
  const onReset = () => {
    setFilterData(initialFilterData);
  };

  // refresh
  const handleRefresh = () => {
    refetchListing();
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
    const makeCount = filterData.selectedMake != undefined ? 1 : 0;
    const modelCount = filterData.selectedModel != undefined ? 1 : 0;
    const rangeHigh =
      filterData.rangeValue?.high != defaultRangeHighValue ? 0.5 : 0;
    const rangeLow =
      filterData.rangeValue?.low != defaultRangeLowValue ? 0.5 : 0;
    const enginTypeCount = filterData.selectedEngineType != undefined ? 1 : 0;
    const transmissionCount =
      filterData.selectedTransmission != undefined ? 1 : 0;
    const priceRange = rangeHigh + rangeLow > 0 ? 1 : 0;
    const count =
      makeCount + modelCount + priceRange + enginTypeCount + transmissionCount;
    setUsedFilter(count);
  }, [filterData]);

  return (
    <>
      <View
        className={`flex-1 bg-[${Colors.backgroundSecondaryVariant}] relative`}
      >
        <Header>
          <View className="flex-row justify-start items-center gap-[13px] px-[4%] py-[16px]">
            <TouchableOpacity
              className={`h-auto rounded-[100px] max-w-11 flex flex-row items-center justify-center bg-[${Colors.buttonSecondary}] p-[11px]`}
              onPress={() => router.back()}
            >
              <ArrowLeft
                size={18}
                variant="Outline"
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
            <ThemedText
              className={`text-[${Colors.textPrimary}] text-[20px] font-[600]`}
            >
              {t("screens.carSearch.title")}
            </ThemedText>
          </View>
        </Header>

        <ScrollView
          className={`flex-1 pt-2 bg-[${Colors.backgroundSecondaryVariant}]`}
        >
          <View className="px-4 my-5 flex-row gap-3">
            <View
              className={`flex-1 flex-row items-center gap-2 px-4 h-[48px] border border-[${Colors.borderPrimary}] rounded-xl`}
            >
              <SearchNormal color={Colors.textQuinary} />
              <TextInput
                value={searchInputValue}
                onChangeText={(value) => {
                  setSearchInputValue(value);
                  handleSearchValueChange(value);
                }}
                className="flex-1"
                placeholder={t("screens.carSearch.text.searchPlaceholder")}
                placeholderTextColor="#000"
                ref={textIinputRef}
                focusable={true}
                autoFocus={Boolean(isFocusable)}
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

          {isLoading ? (
            <FlatList
              className="px-[4%]"
              data={Array.from({ length: 5 })}
              renderItem={(item) => (
                <CarItemSkeleton className="mx-[5px]" page="home" />
              )}
              scrollEnabled={false}
            />
          ) : listingQuery && listingQuery.length > 0 ? (
            <FlatList
              className="px-[4%]"
              data={listingQuery}
              renderItem={({ item }: { item: Car }) => {
                console.log(item._id);
                return (
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
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={() => <View style={{ height: 40 }} />}
            />
          ) : (
            <NoCarFound handleRefresh={handleRefresh} />
          )}
        </ScrollView>
      </View>

      {isModalVisible && (
        <CustomBottomSheetModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          snapPoints={snapPoints}
          index={1}
        >
          <KeyboardAvoidingView className="flex-1">
            <FiltersCarComponent
              filterData={filterData}
              itemIsOpen={itemIsOpen}
              handleOpenItem={handleOpenItem}
              handleMakeModalChange={handleMakeModalChange}
              handleEngTransChange={handleEngTransChange}
              handlePriceRangeChange={handlePriceRangeChange}
              onReset={onReset}
              refetchListing={refetchListing}
              setIsModalVisible={setIsModalVisible}
              handleCloseModal={handleCloseModal}
            />
          </KeyboardAvoidingView>
        </CustomBottomSheetModal>
      )}
    </>
  );
};

export default CarSearchScreen;

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
