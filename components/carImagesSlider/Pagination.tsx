import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  Extrapolation,
} from "react-native-reanimated";

interface PaginationProps {
  data: Array<{ img: any }>;
  index: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const widthStyle = useAnimatedStyle(() => ({
          width: interpolate(
            index,
            [idx - 1, idx, idx + 1],
            [12, 30, 12],
            Extrapolation.CLAMP
          ),
        }));

        const opacityStyle = useAnimatedStyle(() => ({
          opacity: interpolate(
            index,
            [idx - 1, idx, idx + 1],
            [0.6, 1, 0.6],
            Extrapolation.CLAMP
          ),
        }));

        const backgroundColorStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: interpolateColor(
              index,
              [idx - 1, idx, idx + 1],
              ["#ccc", "#eee", "#ccc"],
              "RGB",
              {
                gamma: 2.2,
              }
            ),
          };
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, backgroundColorStyle]}
            className={` transition-all  ${
              index === idx
                ? " opacity-[1] bg-[#eee]"
                : " opacity-[0.5] bg-[#ccc]"
            }`}
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
});
