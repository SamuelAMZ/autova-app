import React, { PropsWithChildren, ReactNode, ComponentType } from "react";
import { TouchableWithoutFeedback, Keyboard, ViewProps } from "react-native";
import { useKeyboardState } from "@/hooks/useKeyboardState";

type DismissKeyboardHOCProps<T> = T & {
  children: ReactNode;
};

const DismissKeyboardHOC = <P extends object>(Comp: ComponentType<P>) => {
  const { isKeyboardVisible } = useKeyboardState();

  const handleDismissKeyboard = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss;
    }
  };
  return ({
    children,
    ...props
  }: PropsWithChildren<DismissKeyboardHOCProps<P>>) => (
    <TouchableWithoutFeedback
      onPress={handleDismissKeyboard}
      accessible={false}
    >
      <Comp {...(props as P)}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardHOC;
