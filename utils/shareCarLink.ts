import { Share, Platform } from "react-native";
import * as Linking from "expo-linking";

export const shareCarApp = async ({
  carId,
  appLink = "com.afi.carapp",
}: {
  carId: string;
  appLink?: string;
}) => {
  // Deep link to car detail page
  const carDetailUrl = `${appLink}://(app)/brands/carDetail/${carId}`;
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.yourapp";
  const appStoreUrl = "https://apps.apple.com/us/app/your-app/idYOUR_APP_ID";

  try {
    // Check if the app can handle the deep link
    const canOpen = await Linking.canOpenURL(carDetailUrl);

    console.log(canOpen, "canOpen", carDetailUrl);

    // if (canOpen) {
    //   // Share the deep link
    //   const result = await Share.share({
    //     message: `Check out this car: ${carDetailUrl}`,
    //     url: carDetailUrl,
    //   });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       console.log(`Shared with activity type: ${result.activityType}`);
    //     } else {
    //       console.log("Shared successfully, but no specific activity type");
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     console.log("Share dialog dismissed");
    //   }
    // } else {
    //   // Fallback to app store links
    //   await Share.share({
    //     message: `Check out this car! Download the app to view it: ${
    //       Platform.OS === "android" ? playStoreUrl : appStoreUrl
    //     }`,
    //     url: Platform.OS === "android" ? playStoreUrl : appStoreUrl,
    //   });
    // }

    try {
      await Share.share({
        message: `Check out this car: ${carDetailUrl}`,
        url: carDetailUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
