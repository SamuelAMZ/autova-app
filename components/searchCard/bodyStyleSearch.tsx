import { FlatList, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { useMemo, useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal";
import { AntDesign } from "@expo/vector-icons";
import { ArrowDown2, Chainlink, TickCircle } from "iconsax-react-native";
import { carDoorsElements } from "@/constants/searchTypes";
import Colors from "@/constants/Colors";
import ClearFilter from "./clearFilter";

const mockData = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
];

const BodyStylesSearch = ({
  onBodyValueChange,
  carDoors,
  selectedItem,
}: {
  onBodyValueChange: (item: ItemDataProps | number | undefined) => void;
  carDoors: number;
  selectedItem?: ItemDataProps;
}) => {
  const snapPoints = useMemo(() => ["40%", "50%", "90%"], []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectItem = (item: ItemDataProps | number | undefined) => {
    onBodyValueChange(item);
    setIsModalVisible(false);
  };

  return (
    <View className="mb-3 flex-col justify-between" >
      <View
        style={{
          height: 90,
          borderWidth: carDoors != 0 ? 1 : 0,
          borderColor: `${Colors.background}`,
        }}
        className="bg-white w-full shadow-sm rounded-lg relative"
      >
        <View className="h-[45%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Doors
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="flex-row h-[50%] w-full justify-between items-center px-3">
          {carDoorsElements.map((item: number) => (
            <TouchableOpacity
              onPress={() => handleSelectItem(item)}
              key={item}
              style={{
                backgroundColor: carDoors == item ? "#5856D6" : undefined,
              }}
              className="h-[30] w-[30] border border-[#D0D5DD] rounded-3xl justify-center items-center"
            >
              <ThemedText
                style={{
                  color: carDoors == item ? "white" : "#344054",
                  fontFamily: "SpaceGrotesk_600SemiBold",
                }}
              >
                {item}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {carDoors != 0 && <ClearFilter onPress={() => handleSelectItem(0)} />}
      </View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="bg-white h-[80] w-full shadow-sm rounded-lg mt-4 relative"
        style={{
          borderWidth: selectedItem ? 1 : 0,
          borderColor: `${Colors.background}`,
        }}
      >
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Body Type
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full gap-4 ml-3 flex-row items-center">
          <ThemedText className="text-[#344054] font-semibold">
            {selectedItem?.label ?? "Select body type"}
          </ThemedText>
          <ArrowDown2 color="#344054" size={16} />
        </View>
        {selectedItem && (
          <ClearFilter onPress={() => handleSelectItem(undefined)} />
        )}
      </TouchableOpacity>

      <CustomBottomSheetModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        snapPoints={snapPoints}
        index={1}
      >
        <View className="w-full px-[4%]">
          <View className="px-4 py-3 flex-row justify-between items-center">
            <ThemedText className="text-[18px]">Choose item</ThemedText>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                <AntDesign name="close" size={16} color="#3D3D3D" />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockData}
            renderItem={(item) => {
              const isSelected = selectedItem?.id == item.item.id;
              return (
                <TouchableOpacity
                  onPress={() => handleSelectItem(item.item)}
                  className="p-4 border-t border-[#F2F4F7] flex-row justify-between items-center"
                >
                  <View className="flex-row gap-3 items-center">
                    <Chainlink
                      color={isSelected ? "#5856D6" : "#475467"}
                      variant="Bold"
                    />
                    <ThemedText className="text-[#475467]">
                      {item.item.label}
                    </ThemedText>
                  </View>
                  {isSelected && <TickCircle color="#5856D6" />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default BodyStylesSearch;
