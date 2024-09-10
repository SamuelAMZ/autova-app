import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowDown2,
  ArrowLeft,
  SearchNormal,
  Setting5,
} from "iconsax-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import CarItem from "@/components/cars/CarItem";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import BodyStylesSearch from "@/components/searchCard/bodyStyleSearch";
import PriceRangeSearch from "@/components/searchCard/priceRangeSearch";
import MakeModelsSearch from "@/components/searchCard/makeModelSearch";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import {
  defaultRangeHighValue,
  defaultRangeLowValue,
  initialFilterData,
} from "@/constants";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FilterDataProps, ItemDataProps } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";
import { getSavedCar } from "@/utils/carRequest";
import { filterCars, loadCars } from "@/utils/carRequest";
import Car from "@/models/car.model";
import NoCarFound from "@/assets/icons/no-car.svg";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { CarItemSkeleton } from "@/components/skeleton/CarItemSkeleton";

const initialItemIsOpenData = {
  makeModel: true,
  priceRange: true,
  bodyStyle: true,
};

const CarSearchScreen = () => {
  const textIinputRef = useRef(null);
  const { searchData } = useLocalSearchParams();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["90%", "92%"], []);
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);
  const [usedFilter, setUsedFilter] = useState<number>();
  const [itemIsOpen, setItemIsOpen] = useState<any>(initialItemIsOpenData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const filteredData = data.filter((e: Car) =>
  //     e.name.includes(searchInputValue)
  //   );
  // }, [searchInputValue]);

  const handleOpenItem = (type: string) => {
    setItemIsOpen({ ...itemIsOpen, [`${type}`]: !itemIsOpen[`${type}`] });
  };

  const initializeStateData = async () => {
    const initialData = searchData
      ? JSON.parse(searchData as string)
      : initialFilterData;
    setFilterData(initialData);
    await loadCars(initialData);
  };

  //
  const loadCars = async (data: FilterDataProps) => {
    setIsLoading(true);
    const cars = await filterCars(data);
    setIsLoading(false);
    setData(cars);
  };

  //
  useEffect(() => {
    initializeStateData();
  }, []);

  // Make & Model Props change
  const handleMakeModalChange = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    if (type != undefined && type == "models") {
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

  // Body Styles props changes
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

  // refresh
  const handleRefresh = () => {
    initializeStateData();
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
    const count =
      makeCount + modelCount + priceRange + carDoorsCount + bodyStyleCount;
    setUsedFilter(count);
  }, [filterData]);

  const filteredCars: Car[] =
    data.length > 0
      ? data.filter((e: Car) =>
          e.name
            .toLocaleLowerCase()
            .includes(searchInputValue.toLocaleLowerCase().trim())
        )
      : [];

  //

  // const listingCarsQuery = useQuery({
  //   queryKey: ["listing-cars"],
  //   queryFn: loadCars,
  // });

  // const getSavedCarsQuery = useQuery({
  //   queryKey: ["get-saved-cars"],
  //   queryFn: () => getSavedCar({ userId: "66d08d69f683984aa2acef6f" }),
  // });
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
              Cars by body styles
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
                onChangeText={(value) => setSearchInputValue(value)}
                className="flex-1"
                placeholder="Search..."
                placeholderTextColor="#000"
                ref={textIinputRef}
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
          ) : data && data.length > 0 ? (
            <FlatList
              className="px-[4%]"
              data={filteredCars}
              renderItem={({ item }: { item: Car }) => (
                <CarItem
                  car={item}
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
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={() => <View style={{ height: 40 }} />}
            />
          ) : (
            <View className="flex-1 h-[350] items-center justify-center">
              <NoCarFound />
              <ThemedText
                style={{ fontFamily: "SpaceGrotesk_500SemiBold" }}
                className="text-[16px]"
              >
                No car found
              </ThemedText>
              <TouchableOpacity onPress={() => handleRefresh()} className="p-3">
                <ThemedText
                  style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                  className="text-[blue] text-[16px]"
                >
                  Retry
                </ThemedText>
              </TouchableOpacity>
            </View>
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
            <BottomSheetScrollView
              className={`pb-4 bg-[${Colors.backgroundQuaternary}]`}
            >
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
            </BottomSheetScrollView>
            <View className="px-4 py-5 flex-row gap-3 self-center">
              <View className="flex-1">
                <CustomButton
                  onPress={() => {
                    loadCars(filterData);
                    setIsModalVisible(false);
                  }}
                  title={"Search"}
                />
              </View>
              <TouchableOpacity
                onPress={() => onReset()}
                className="h-[48] w-[48] bg-[red] rounded-xl justify-center items-center"
              >
                <Icon name="close" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
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
