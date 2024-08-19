import { Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  fontFamily?: string;
};

const ThemedText = ({
  children,
  fontFamily,
  ...otherProps
}: ThemedTextProps) => {
  return (
    <Text
      style={{ fontFamily: fontFamily ?? "Poppins_400Regular" }}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
