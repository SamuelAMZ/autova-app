import { TextInput, View, ViewProps } from "react-native";
import RangeSlider from "../RangeSlider";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import ClearFilter from "./clearFilter";
import { defaultRangeHighValue, defaultRangeLowValue } from "@/constants";
import { thousandSeparator } from "@/constants/utils";
import { RangeProps } from "@/constants/types";

const PriceRangeSearch = ({
  onValueChange,
  rangeValue,
  ...rest
}: ViewProps & {
  onValueChange: (low: number, high: number) => void;
  rangeValue: RangeProps;
}) => {
  const [lowValue, setLowValue] = useState(rangeValue.low);
  const [highValue, setHighValue] = useState(rangeValue.high);
  const [isHighInputFocused, setIsHighInputFocused] = useState<boolean>(false);

  const handleValueChange = (low: number, high: number) => {
    onValueChange(low, high);
  };

  useEffect(() => {
    if (lowValue <= highValue) {
      onValueChange(lowValue, highValue);
    }
  }, [lowValue]);

  useEffect(() => {
    if (highValue >= lowValue) {
      onValueChange(lowValue, highValue);
    }
  }, [highValue]);

  useEffect(() => {
    setLowValue(rangeValue.low);
  }, [rangeValue.low]);

  useEffect(() => {
    setHighValue(rangeValue.high);
  }, [rangeValue.high]);

  const isSelected =
    rangeValue.high != defaultRangeHighValue ||
    rangeValue.low != defaultRangeLowValue;

  return (
    <View
      className="w-full z-0 rounded-lg relative"
      {...rest}
      style={{
        borderWidth: isSelected ? 1 : 0,
        borderColor: `${Colors.background}`,
      }}
    >
      <RangeSlider
        low={rangeValue.low}
        high={rangeValue.high}
        onValueChange={handleValueChange}
        from={defaultRangeLowValue}
        to={defaultRangeHighValue}
      />
      <View className="w-full flex-row justify-between my-4">
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <TextInput
            keyboardType="numeric"
            value={
              !isHighInputFocused
                ? thousandSeparator(lowValue)
                : lowValue.toString()
            }
            className="w-full text-center h-full"
            onFocus={() => setIsHighInputFocused(true)}
            onBlur={() => setIsHighInputFocused(!isHighInputFocused)}
            onChangeText={(value) => setLowValue(Number(value))}
          />
        </View>
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <TextInput
            keyboardType="numeric"
            value={
              highValue >= defaultRangeHighValue && !isHighInputFocused
                ? thousandSeparator(highValue) + "+"
                : !isHighInputFocused
                ? thousandSeparator(highValue)
                : highValue.toString()
            }
            className="w-full text-center h-full"
            onFocus={() => setIsHighInputFocused(true)}
            onBlur={() => setIsHighInputFocused(!isHighInputFocused)}
            onChangeText={(value) => setHighValue(Number(value))}
          />
        </View>
      </View>
      {isSelected && (
        <ClearFilter
          onPress={() =>
            onValueChange(defaultRangeLowValue, defaultRangeHighValue)
          }
        />
      )}
    </View>
  );
};

export default PriceRangeSearch;
