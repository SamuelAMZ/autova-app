import { FlatList, TouchableOpacity, View } from "react-native";
import ThemedText from "../ThemedText";
import { useMemo, useState } from "react";
import CustomBottomSheetModal from "../BottomSheetModal";
import { ArrowDown2, Chainlink, TickCircle } from "iconsax-react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ClearFilter from "./clearFilter";
import { ItemDataProps, selectedTypeProps } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";
import { loadEngineTypes } from "@/utils/engineTypesRequest";
import { loadTransmissions } from "@/utils/transmissionsRequest";
import { useTranslation } from "react-i18next";

const OtherFilterSearch = ({
  onChange,
  selectedTransmission,
  selectedEngineType,
}: {
  onChange: (type: string | undefined, item: ItemDataProps | undefined) => void;
  selectedTransmission?: ItemDataProps;
  selectedEngineType?: ItemDataProps;
}) => {
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["40%", "50%", "90%"], []);
  const [selectedType, setSelectedType] = useState<selectedTypeProps>();

  //
  const { data: transmissions } = useQuery({
    queryKey: ["transmissions"],
    queryFn: loadTransmissions,
  });

  //
  const { data: engineTypes } = useQuery({
    queryKey: ["engine_types"],
    queryFn: loadEngineTypes,
  });

  // callbacks
  const handleTypeChange = (type: string) => {
    setSelectedType({ type, data: [] });
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectItem = (
    type: string | undefined,
    item: ItemDataProps | undefined
  ) => {
    onChange(type, item);
    setIsModalVisible(false);
  };

  const handleIsSelected = (item: ItemDataProps): boolean => {
    console.log(selectedTransmission);
    if (selectedType?.type == "transmissions") {
      return selectedTransmission?._id == item._id;
    } else {
      return selectedEngineType?._id == item._id;
    }
  };

  return (
    <>
      <View className="mb-3 flex-row justify-between">
        <TouchableOpacity
          onPress={() => handleTypeChange("engineTypes")}
          className="bg-white h-[80] w-[47%] shadow-sm rounded-lg relative"
          style={{
            borderWidth: selectedEngineType ? 1 : 0,
            borderColor: `${Colors.background}`,
          }}
        >
          <View className="h-[50%] w-full justify-center ml-3">
            <ThemedText className="text-[#344054] font-semibold">
              {t("components.filterSearch.engineTypeUI.title")}
            </ThemedText>
          </View>
          <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
          <View className="h-[50%] w-full justify-center ml-3">
            <View className="flex-row gap-3 items-center">
              <ThemedText className="text-[#344054] font-semibold">
                {selectedEngineType?.name ??
                  t("components.filterSearch.engineTypeUI.selectType")}
              </ThemedText>
              <ArrowDown2 color="#344054" size={16} />
            </View>
          </View>
          {selectedEngineType && (
            <ClearFilter
              onPress={() => handleSelectItem("engineTypes", undefined)}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTypeChange("transmissions")}
          className="bg-white h-[80] w-[47%] shadow-sm rounded-lg relative"
          style={{
            borderWidth: selectedTransmission ? 1 : 0,
            borderColor: `${Colors.background}`,
          }}
        >
          <View className="h-[50%] w-full justify-center ml-3">
            <ThemedText className="text-[#344054] font-semibold">
              {t("components.filterSearch.transmissionUI.title")}
            </ThemedText>
          </View>
          <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
          <View className="h-[50%] w-full justify-center ml-3">
            <View className="flex-row gap-3 items-center">
              <ThemedText className="text-[#344054] font-semibold">
                {selectedTransmission?.name ??
                  t("components.filterSearch.transmissionUI.selectType")}
              </ThemedText>
              <ArrowDown2 color="#344054" size={16} />
            </View>
          </View>
          {selectedTransmission && (
            <ClearFilter
              onPress={() => handleSelectItem("transmissions", undefined)}
            />
          )}
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <CustomBottomSheetModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          snapPoints={snapPoints}
          index={1}
        >
          <View className="w-full px-[4%]">
            <View className="px-4 py-3 flex-row justify-between items-center">
              <ThemedText className="text-[18px]">
                {t("components.filterSearch.bottomSheet.title")}
              </ThemedText>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <View className="bg-[#7F7F7F33] rounded-full p-[6px]">
                  <AntDesign name="close" size={16} color="#3D3D3D" />
                </View>
              </TouchableOpacity>
            </View>

            <FlatList
              data={
                selectedType?.type == "transmissions"
                  ? transmissions.data
                  : engineTypes.data
              }
              renderItem={(item) => {
                const isSelected = handleIsSelected(item.item);
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectItem(selectedType?.type!, item.item)
                    }
                    className="p-4 border-t border-[#F2F4F7] flex-row justify-between items-center"
                  >
                    <View className="flex-row gap-3 items-center">
                      <Chainlink
                        color={isSelected ? "#5856D6" : "#475467"}
                        variant="Bold"
                      />
                      <ThemedText className="text-[#475467]">
                        {item.item.name}
                      </ThemedText>
                    </View>
                    {isSelected && <TickCircle color="#5856D6" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </CustomBottomSheetModal>
      )}
    </>
  );
};

export default OtherFilterSearch;
