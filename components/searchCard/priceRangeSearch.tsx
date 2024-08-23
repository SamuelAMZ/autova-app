import { TextInput, View, ViewProps } from "react-native";
import RangeSlider from "../RangeSlider";
import { useEffect, useState } from "react";
import ThemedText from "../ThemedText";

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

  return (
    <View className="w-full z-0" {...rest}>
      <RangeSlider
        low={rangeValue.low}
        high={rangeValue.high}
        onValueChange={handleValueChange}
        from={0}
        to={5000000}
      />
      <View className="w-full flex-row justify-between my-4">
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <TextInput
            keyboardType="numeric"
            value={lowValue.toString()}
            className="w-full text-center h-full"
            onChangeText={(value) => setLowValue(Number(value))}
          />
        </View>
        <View className="w-[45%] border border-[#D0D5DD] rounded-[80px] h-[33px] items-center justify-center">
          <TextInput
            keyboardType="numeric"
            value={highValue.toString()}
            className="w-full text-center h-full"
            onChangeText={(value) => setHighValue(Number(value))}
          />
        </View>
      </View>
    </View>
  );
};

export default PriceRangeSearch;
