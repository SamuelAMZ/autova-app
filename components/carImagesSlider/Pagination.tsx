import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");

interface PaginationProps {
  data: Array<{ img: any }>;
  scrollX: Animated.Value;
  index: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          // outputRange: [12, 30, 12],
          outputRange: [12, 12, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          // outputRange: [0.2, 1, 0.1],
          outputRange: [0.6, 1, 0.6],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          // outputRange: ["#ccc", "#5856D6", "#ccc"],
          outputRange: ["#ccc", "#eee", "#ccc"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor, opacity },
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#000",
  },
});
