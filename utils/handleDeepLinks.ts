import { Linking, Alert } from "react-native";

export const openWhatsApp = async (
  phoneNumber: string = "+1234567890",
  message: string = ""
) => {
  // Remove any non-numeric characters
  const formattedNumber = phoneNumber.replace(/[^0-9]/g, "");

  // Encode the message to handle special characters
  const encodedMessage = encodeURIComponent(message);

  // Construct the URL
  // const url = `whatsapp://send?phone=${formattedNumber}&text=${encodedMessage}`;
  const url = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  try {
    // Check if WhatsApp is installed
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "WhatsApp Not Installed",
        "Please install WhatsApp to send a message."
      );
    }
  } catch (error) {
    console.error("Error opening WhatsApp:", error);
    Alert.alert("Error", "An error occurred while trying to open WhatsApp.");
  }
};

export const openTelegram = async (username: string = "telegramUsername") => {
  // Construct the URL
  // const url = `tg://resolve?domain=${username}`;
  const url = `https://t.me/${username}`;

  try {
    // Check if Telegram is installed
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Telegram Not Installed",
        "Please install Telegram to send a message."
      );
    }
  } catch (error) {
    console.error("Error opening Telegram:", error);
    Alert.alert("Error", "An error occurred while trying to open Telegram.");
  }
};

 export const makePhoneCall = async (phoneNumber: string = "+1234567890") => {
  // Remove any non-numeric characters
  const formattedNumber = phoneNumber.replace(/[^0-9]/g, "");

  // Construct the URL
  const url = `tel:${formattedNumber}`;

  try {
    // Check if the device can handle the tel URL
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Cannot Make Call",
        "This device does not support phone calls."
      );
    }
  } catch (error) {
    console.error("Error making phone call:", error);
    Alert.alert(
      "Error",
      "An error occurred while trying to make a phone call."
    );
  }
};
