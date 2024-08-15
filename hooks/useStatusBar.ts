import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Platform } from "react-native";
import React from "react";

// useStatusBar('light-content', 'transparent', true);
// useStatusBar('dark-content', '#fff', false);

const useStatusBar = (
  barStyle = "dark-content",
  backgroundColor = "#fff",
  translucent = true
) => {
  useFocusEffect(
    React.useCallback(() => {
      if (barStyle === "dark-content") {
        StatusBar.setBarStyle("dark-content");
      } else if (barStyle === "light-content") {
        StatusBar.setBarStyle("light-content");
      }
      if (Platform.OS != "ios") {
        StatusBar.setBackgroundColor(backgroundColor);
        StatusBar.setTranslucent(translucent);
      }

      // return () => {
      //   // Reset the status bar to default settings when screen is unfocused
      //   StatusBar.setBarStyle("default");
      //   if (Platform.OS != "ios") {
      //     StatusBar.setBackgroundColor("#fff");
      //     StatusBar.setTranslucent(false);
      //   }
      // };
    }, [barStyle, backgroundColor, translucent])
  );
};

export default useStatusBar;
