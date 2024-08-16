import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

const MySafeAreaView = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MySafeAreaView;
