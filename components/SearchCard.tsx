import { PropsWithChildren, useState } from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";
import RangeSlider from "./RangeSlider";
import ThemedText from "./ThemedText";

const SearchCard = ({ children }: PropsWithChildren) => {
  const [searchType, setSearchType] = useState("model");

  const handleTypeChange = (item: string) => setSearchType(item);

  return (
    <View className="bg-[#F2F4F7] w-full p-3 rounded-xl">
      <View className="w-full mb-3 flex-row items-center">
        <Text className="text-[#101828] text-[18px] font-semibold">
          Search cars by:
        </Text>
        <View className="flex-1 ml-2">
          <Picker
            style={{ height: 30, color: "#475467" }}
            selectedValue={searchType}
            onValueChange={handleTypeChange}
          >
            <Picker.Item label="Make & Model" value="model" />
            <Picker.Item label="Price Range" value="price" />
            <Picker.Item label="Body Styles" value="body" />
          </Picker>
        </View>
      </View>

      <SearchContent type={searchType} />

      {/* {children} */}
      <CustomButton title="Search" onPress={() => {}} />
    </View>
  );
};

export default SearchCard;

const SearchContent = ({ type }: { type: string }) => {
  return type === "model" ? (
    <MakeModelsSearch />
  ) : type === "price" ? (
    <PriceRangeSearch />
  ) : type == "body" ? (
    <BodyStylesSearch />
  ) : (
    <View className=""></View>
  );
};

const MakeModelsSearch = () => {
  return (
    <View className="mb-3 flex-row justify-between">
      <View className="bg-white h-[80] w-[47%] shadow-sm rounded-lg">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">Make</ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Any Make
          </ThemedText>
        </View>
      </View>
      <View className="bg-white h-[80] w-[47%] shadow-sm rounded-lg">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Model
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Any Model
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const PriceRangeSearch = () => {
  return (
    <View className="w-full">
      <RangeSlider from={0} to={500000} />
      <View className="w-full flex-row justify-between my-4">
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">$0k</ThemedText>
        </View>
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">
            $50,000,00
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const BodyStylesSearch = () => {
  return (
    <View className="mb-3 flex-col justify-between">
      <View className="bg-white h-[80] w-full shadow-sm rounded-lg">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Doors
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="flex-row h-[50%] w-full justify-between items-center px-3">
          {Array.from({ length: 5 }, (v, i) => (
            <View
              key={i}
              className="h-[30] w-[30] border border-[#D0D5DD] rounded-3xl justify-center items-center"
            >
              <ThemedText className="text-[#344054] font-semibold">
                {i + 2}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
      <View className="bg-white h-[80] w-full shadow-sm rounded-lg mt-3">
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Body Type
          </ThemedText>
        </View>
        <View className="w-[90%] h-[1] bg-[#F2F4F7] self-center"></View>
        <View className="h-[50%] w-full justify-center ml-3">
          <ThemedText className="text-[#344054] font-semibold">
            Convertible
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
