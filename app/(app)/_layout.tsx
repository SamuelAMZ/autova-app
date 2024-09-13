import { router, Stack, useNavigation } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState, Linking, Platform } from "react-native";
import type { AppStateStatus } from "react-native";
import { focusManager } from "@tanstack/react-query";

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { useEffect } from "react";

// Online status management ==> auto refetch on reconnect
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// Refetch on App focus
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

// Create a client
const queryClient = new QueryClient();

export default function AppLayout() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Handle initial URL when the app is launched
    const handleInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        handleDeepLink(initialURL);
      }
    };

    handleInitialURL();

    // Add event listener for incoming URLs
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    // Cleanup the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = (url: string) => {
    try {
      // Parse the URL
      const parsedURL = new URL(url);
      const path = parsedURL.pathname;

      if (path && path.includes("/(app)/brands/carDetail")) {
        const segments = url.split("/");
        const carId = segments.pop();

        if (carId) {
          // Navigate to the CarDetail screen with carId
          router.navigate({
            pathname: "/(app)/brands/carDetail",
            params: {
              carId: carId,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error handling deep link:", error);
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(navs)" />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
