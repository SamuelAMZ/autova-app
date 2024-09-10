import {
  CollectionActionModal,
  CollectionOptionModal,
} from "@/components/collection";
import Header from "@/components/Header";
import ThemedText from "@/components/ThemedText";
import { router } from "expo-router";
import { More, TickCircle, Trash } from "iconsax-react-native";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import CustomCheckBox from "@/components/CustomCheckbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedCar, unSaveSingleCar } from "@/utils/carRequest";
import { SavedCarSkeleton } from "@/components/skeleton/SavedCarSkeleton";
import { ErrorLoadingData } from "@/components/ErrorLoading";
import NoCarFound from "@/assets/icons/no-car.svg";
import Car from "@/models/car.model";

interface modalInitialState {
  type: string;
  visible: boolean;
}

const CollectionDetails = () => {
  const [allItems, setAllItems] = useState<string[]>([]);
  const [moreVisible, setMoreVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState<modalInitialState>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectAllCheked, setIsSelectAllCheked] = useState(false);

  const queryClient = useQueryClient();

  const handelModalVisible = (type: string) => {
    setMoreVisible(false);
    setmodalVisible({ type, visible: !modalVisible?.visible });
  };

  const handleLongPress = (idx: string) => {
    let updatedSelectedItems = [...selectedItems];
    const isSelected = handleIsSelected(idx);

    if (isSelected) {
      // Remove the item if already selected
      updatedSelectedItems = updatedSelectedItems.filter((e) => e !== idx);
    } else {
      // Add the item to selected items if not already selected
      updatedSelectedItems.push(idx);
    }

    // Update selected items
    setSelectedItems(updatedSelectedItems);

    // Check if all items are selected
    const allSelected = updatedSelectedItems.length === allItems.length;
    setIsSelectAllCheked(allSelected);
  };

  // Check if the item is selected
  const handleIsSelected = (idx: string): boolean => {
    return selectedItems.includes(idx);
  };

  // Handles selecting or deselecting all items
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allItemIndexes = allItems.map((item, idx) => item);
      setSelectedItems(allItemIndexes);
    } else {
      setSelectedItems([]);
    }
    setIsSelectAllCheked(checked);
  };

  // Handles removing an item by index
  const handleRemoveItem = async (idx?: number) => {
    if (selectedItems.length) {
      await Promise.all(
        selectedItems.map((carId) =>
          unSaveSingleCar({
            carId,
            userId: "66d08d69f683984aa2acef6f",
          })
        )
      );

      let updatedSelectedItems = [...selectedItems];
      selectedItems.forEach((idx) => {
        // Remove the item if already selected
        updatedSelectedItems = updatedSelectedItems.filter((e) => e !== idx);
      });

      console.log(selectedItems, updatedSelectedItems, "check");
      // Update selected items
      setSelectedItems(updatedSelectedItems);

      // refetch saved cars id
      queryClient.invalidateQueries({
        queryKey: ["get-saved-cars"],
        exact: true,
      });

      // refetch saved cars data
      queryClient.invalidateQueries({
        queryKey: ["get-saved-cars-list"],
        exact: true,
      });
    }
    setmodalVisible(undefined);
  };

  const handleSwipeableOpen = (idx: string) => {
    const isSelected = handleIsSelected(idx);
    if (!isSelected) {
      handleLongPress(idx);
    }
  };

  const handleSwipeableClose = (idx: string) => {
    const isSelected = handleIsSelected(idx);
    if (isSelected) {
      handleLongPress(idx);
    }
  };

  // Fetch the list of saved cars using a query
  const getSavedCarsQueryList = useQuery({
    queryKey: ["get-saved-cars-list"],
    queryFn: () =>
      getSavedCar({ userId: "66d08d69f683984aa2acef6f", expand: true }),
  });

  useEffect(() => {
    if (getSavedCarsQueryList.isSuccess) {
      const data = getSavedCarsQueryList.data?.carsId || [];
      setAllItems(data);
    }
  }, [getSavedCarsQueryList.isSuccess, getSavedCarsQueryList.isLoading]);

  const itemsLength = allItems.length;
  const itemsEmpty = selectedItems.length === 0;

  return (
    <>
      <Header className="z-10">
        <View className="flex flex-row justify-between w-full items-center px-[4%] py-[18px]">
          <View className="flex-row gap-4 items-center">
            <ThemedText
              className="text-[#fff] text-[22px]"
              style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
            >
              Saved
            </ThemedText>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: !itemsEmpty ? "red" : "#6C6BDB",
            }}
            onPress={() =>
              itemsEmpty
                ? setMoreVisible(!moreVisible)
                : handelModalVisible("delete")
            }
            className="justify-center items-center w-[40] h-[40] rounded-3xl relative"
          >
            {!itemsEmpty ? (
              <Trash color="white" size={20} />
            ) : (
              <More
                style={{ transform: [{ rotate: "90deg" }] }}
                color="white"
                size={20}
              />
            )}
            {moreVisible && (
              <CollectionOptionModal
                deletePress={() => handelModalVisible("delete")}
              />
            )}
          </TouchableOpacity>
        </View>
      </Header>

      <View className="flex-1 bg-white px-4">
        <ThemedText
          className=" text-[18px] mt-5"
          style={{ fontFamily: "SpaceGrotesk_700Bold" }}
        >
          Saved Cars
        </ThemedText>
        {!itemsEmpty ? (
          <TouchableOpacity
            onPress={() => handleSelectAll(!isSelectAllCheked)}
            className="flex-row py-4 items-center gap-2"
          >
            <CustomCheckBox isChecked={isSelectAllCheked} />
            <ThemedText style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}>
              Select all items
            </ThemedText>
          </TouchableOpacity>
        ) : null}

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
          <View>
            <FlatList
              className="z-0 mt-5"
              data={getSavedCarsQueryList.data?.cars}
              renderItem={({ item, index }) => {
                const isActive = handleIsSelected(item._id);
                return (
                  <View className="relative">
                    <SwipeToRemove
                      car={item}
                      onRemove={() => {
                        handelModalVisible("delete");
                      }}
                      onSwipeableOpen={() => {
                        handleSwipeableOpen(item._id);
                      }}
                      onSwipeableClose={() => {
                        handleSwipeableClose(item._id);
                      }}
                      pressable={
                        !(getSavedCarsQueryList.data?.cars.length === 0)
                      }
                      onLongPress={() => handleLongPress(item._id)}
                      isActive={isActive}
                    />
                  </View>
                );
              }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={8}
              ListFooterComponent={() => (
                <View style={{ height: Platform.OS == "android" ? 40 : 60 }} />
              )}
              ListEmptyComponent={() => (
                <View className="flex-1 h-[350] items-center justify-center">
                  <NoCarFound />
                  <ThemedText
                    style={{ fontFamily: "SpaceGrotesk_500SemiBold" }}
                    className="text-[16px]"
                  >
                    No car found
                  </ThemedText>
                  <TouchableOpacity
                    onPress={() => getSavedCarsQueryList.refetch()}
                    className="p-3"
                  >
                    <ThemedText
                      style={{ fontFamily: "SpaceGrotesk_600SemiBold" }}
                      className="text-[blue] text-[16px]"
                    >
                      Retry
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : null}

        {getSavedCarsQueryList.isError ? (
          <ErrorLoadingData refetch={getSavedCarsQueryList.refetch} />
        ) : null}
      </View>
      {getSavedCarsQueryList.isSuccess &&
      getSavedCarsQueryList.data?.cars?.length > 0 ? (
        <CollectionActionModal
          okPress={() => handleRemoveItem()}
          cancelPress={() => setmodalVisible(undefined)}
          childrenTop={
            <View className="p-5 rounded-full items-center justify-center bg-[#F5F5F5]">
              <Trash color="red" />
            </View>
          }
          childrenCenter={
            <View className="py-4 items-center">
              <ThemedText
                className="text-[18px]"
                style={{ fontFamily: "SpaceGrotesk_700Bold" }}
              >
                You are about to remove this item
              </ThemedText>
              <ThemedText className="text-center">
                This will remove your product from save Are you sure?
              </ThemedText>
            </View>
          }
          rightText="Delete"
          visible={modalVisible?.type == "delete" && modalVisible.visible}
        />
      ) : null}
    </>
  );
};

export default CollectionDetails;

const SavedCarItem = ({
  car,
  onLongPress,
  onPress,
  isActive,
}: {
  car: Car;
  onLongPress: () => void;
  onPress?: () => void;
  isActive: boolean;
}) => {
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
      onLongPress={onLongPress}
      onPress={() =>
        router.navigate({
          pathname: "/(app)/brands/carDetail",
          params: {
            carId: car._id,
          },
        })
      }
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
      {isActive && (
        <View className="absolute right-2 top-2">
          <TickCircle color="#5856D6" variant="Bold" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const SwipeToRemove = ({
  car,
  onLongPress,
  pressable,
  onRemove,
  onSwipeableOpen,
  onSwipeableClose,
  isActive,
}: {
  car: Car;
  pressable: boolean;
  onLongPress: () => void;
  onRemove: () => void;
  onSwipeableOpen: () => void;
  onSwipeableClose: () => void;
  isActive: boolean;
}) => {
  const swipeableRef = useRef<Swipeable>(null);
  if (!isActive) {
    swipeableRef.current?.close();
  }
  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={onSwipeableOpen}
      onSwipeableClose={onSwipeableClose}
      renderRightActions={() => <RighAction onRemove={onRemove} />}
    >
      <SavedCarItem
        car={car}
        onPress={pressable ? onLongPress : undefined}
        onLongPress={onLongPress}
        isActive={isActive}
      />
    </Swipeable>
  );
};

const RighAction = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <TouchableOpacity onPress={onRemove}>
      <View className="w-full items-center justify-center h-[100%] flex-1 bg-[#6C6BDB] px-4 rounded-lg">
        <Trash color="white" />
        <ThemedText
          style={{ fontFamily: "SpaceGrotesk_600SemiBold", color: "white" }}
        >
          Remove
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};
