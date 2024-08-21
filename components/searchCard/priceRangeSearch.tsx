import { View } from "react-native";
import RangeSlider from "../RangeSlider";
import ThemedText from "../ThemedText";

const PriceRangeSearch = () => {
  return (
    <View className="w-full z-0">
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

export default PriceRangeSearch;
