import { View } from "react-native";
import RangeSlider from "../RangeSlider";
import ThemedText from "../ThemedText";
import { useCallback, useMemo, useState } from "react";

interface RangeProps {
  low: number;
  high: number;
}

const PriceRangeSearch = () => {
  const [rangeValue, setRangeValue] = useState<RangeProps>({
    low: 0,
    high: 500000,
  });

  const handleValueChange = (low: number, high: number) => {
    setRangeValue({ low, high });
  };

  return (
    <View className="w-full z-0">
      <RangeSlider onValueChange={handleValueChange} from={0} to={500000} />
      <View className="w-full flex-row justify-between my-4">
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">
            ${rangeValue.low}k
          </ThemedText>
        </View>
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <ThemedText className="text-[#101828] font-semibold">
            {/* $50,000,00 */}${rangeValue.high}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default PriceRangeSearch;
