import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import Thumb from "./Thumb";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Label from "./Label";
import Notch from "./Notch";

const RangeSlider = ({ from, to }: { from: number; to: number }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(
    (name: "high" | "low") => <Thumb name={name} />,
    []
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);

  return (
    <RangeSliderRN
      style={{ marginTop: 20 }}
      min={min}
      max={max}
      step={1}
      floatingLabel={true}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      //   onValueChanged={handleValueChange}
    />
  );
};

export default RangeSlider;
