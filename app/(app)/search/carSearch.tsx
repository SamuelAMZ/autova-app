import { router } from "expo-router";
import {
  ArrowDown2,
  ArrowLeft,
  SearchNormal,
  Setting5,
} from "iconsax-react-native";
import { useEffect, useMemo, useState } from "react";
import {
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
import { CarData } from "@/constants/CarData";
import CustomBottomSheetModal from "@/components/BottomSheetModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import BodyStylesSearch from "@/components/searchCard/bodyStyleSearch";
import PriceRangeSearch from "@/components/searchCard/priceRangeSearch";
import MakeModelsSearch from "@/components/searchCard/makeModelSearch";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";

const initialFilterData = {
  selectedMakeItem: undefined,
  selectedModelItem: undefined,
  selectedBodyItem: undefined,
  rangeValue: { low: 0, high: 500000 },
  carDoors: 0,
};

const initialItemIsOpen = {
  makeModel: true,
  priceRange: true,
  bodyStyle: true,
};

const CarSearchScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const snapPoints = useMemo(() => ["80%", "90%"], []);
  const [filterData, setFilterData] =
    useState<FilterDataProps>(initialFilterData);
  const [usedFilter, setUsedFilter] = useState<number>(0);
  const [itemIsOpen, setItemIsOpen] = useState<any>(initialItemIsOpen);

  const handleOpenItem = (type: string) => {
    setItemIsOpen({ ...itemIsOpen, [`${type}`]: !itemIsOpen[`${type}`] });
  };

  // Make & Model Props change
  const handleMakeModalChange = (type: string, item: ItemDataProps) => {
    if (type == "models") {
      setFilterData({ ...filterData, selectedModelItem: item });
    } else {
      setFilterData({ ...filterData, selectedMakeItem: item });
    }
  };

  // Price Range Props change
  const handlePriceRangeChange = (low: number, high: number) => {
    setFilterData({ ...filterData, rangeValue: { low, high } });
  };

  // Body Styles props change
  const handleBodyStyleChange = (item: ItemDataProps | number) => {
    if (typeof item == "number") {
      setFilterData({ ...filterData, carDoors: item });
    } else {
      setFilterData({ ...filterData, selectedBodyItem: item });
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
    const makeModel =
      filterData.selectedMakeItem != undefined ||
      filterData.selectedModelItem != undefined
        ? 1
        : 0;
    const priceRange =
      filterData.rangeValue.high != 500000 || filterData.rangeValue.low != 0
        ? 1
        : 0;
    const bodyStyle =
      filterData.carDoors != 0 || filterData.selectedBodyItem != undefined
        ? 1
        : 0;
    setUsedFilter(makeModel + priceRange + bodyStyle);
  }, [filterData]);

  //
  return (
    <>
      <View className={`flex-1 bg-[${Colors.backgroundSecondaryVariant}]`}>
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
          className={`flex-1 bg-[${Colors.backgroundSecondaryVariant}]`}
        >
          <View className="px-4 my-5 flex-row gap-3">
            <View
              className={`flex-1 flex-row items-center gap-2 px-4 h-[48px] border border-[${Colors.borderPrimary}] rounded-xl`}
            >
              <SearchNormal color={Colors.textQuinary} />
              <TextInput
                className="flex-1"
                placeholder="Search..."
                underlineColorAndroid="transparent"
                autoFocus={true}
              />
            </View>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              className={`justify-center items-center border h-[48px] w-[48px] border-[${Colors.borderPrimary}] rounded-xl relative`}
            >
              <Setting5 color={Colors.textQuinary} />
              {usedFilter != 0 && (
                <View
                  className={`absolute bg-[${Colors.background}] h-[24] w-[25] rounded-2xl top-[-8] right-[-8] items-center justify-center`}
                >
                  <ThemedText className="text-white"> {usedFilter} </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FlatList
            className="px-[4%]"
            data={CarData}
            renderItem={({ item }) => (
              <CarItem
                car={item}
                onPress={() => {
                  router.navigate({
                    pathname: "/(app)/brands/carDetail",
                  });
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 40 }} />}
          />
        </ScrollView>
      </View>

      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        snapPoints={snapPoints}
        index={1}
      >
        <View className="w-full relative">
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
                <AntDesign name="close" size={16} color={Colors.iconPrimary} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            className={`h-[100%] bg-[${Colors.backgroundQuaternary}] p-4 w-full`}
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
            {itemIsOpen.priceRange && (
              <PriceRangeSearch
                rangeValue={filterData.rangeValue}
                onValueChange={handlePriceRangeChange}
              />
            )}

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

            <View className="flex-row mt-4 gap-3 ">
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
        </View>
      </CustomBottomSheetModal>
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
      className="w-full flex-row items-center justify-between mb-4"
    >
      <ThemedText
        className={`text-[${Colors.textSecondary}] font-semibold text-[16px] `}
      >
        {title}
      </ThemedText>
      <ArrowDown2 variant="Bold" color="#101828" size={20} />
    </TouchableOpacity>
  );
};
