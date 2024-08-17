import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 12,
    backgroundColor: "#5856D6",
    borderRadius: 2,
  },
});
