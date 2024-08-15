import { Text } from "react-native";

const ThemedText = ({
  children,
  fontFamily = "PlusJakartaSans_400Regular",
  ...otherProps
}) => {
  return (
    <Text
      style={{
        fontFamily: fontFamily,
      }}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
