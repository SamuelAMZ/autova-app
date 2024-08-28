import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardState() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    function onKeyboardDidShow(event: KeyboardEvent) {
      setKeyboardVisible(true);
      setKeyboardHeight(event?.endCoordinates?.height || 0);
    }

    function onKeyboardDidHide() {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    }

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    setKeyboardVisible,
    keyboardHeight,
  };
}
