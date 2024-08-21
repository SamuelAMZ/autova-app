import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import Thumb from "./Thumb";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Label from "./Label";
import Notch from "./Notch";

const RangeSlider = ({
  from,
  to,
  onValueChange,
}: {
  from: number;
  to: number;
  onValueChange: (low: number, high: number) => void;
}) => {
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

  const handleValueChange = useCallback(
    (low: number, high: number) => onValueChange(low, high),
    []
  );

  return (
    <RangeSliderRN
      style={{ marginTop: 20, zIndex: 0 }}
      min={from}
      max={to}
      step={1}
      floatingLabel={true}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      onValueChanged={handleValueChange}
    />
  );
};

export default RangeSlider;
