import { Stack } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(navs)" />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
