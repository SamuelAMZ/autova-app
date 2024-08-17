import { View } from "react-native";

const VerticalSeperator = ({ size }: { size: number }) => (
  <View style={{ height: size }} />
);

const HorizontalSeperator = ({ size }: { size: number }) => (
  <View style={{ width: size }} />
);

export { VerticalSeperator, HorizontalSeperator };
