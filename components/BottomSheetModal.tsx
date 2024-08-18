import React, { useRef, useMemo, ReactNode } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

// Define the props interface
interface CustomBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  // snapPoints: string[];
  children: ReactNode;
}

// Reusable BottomSheet Component
const CustomBottomSheetModal = ({
  isVisible,
  onClose,
  children,
}: CustomBottomSheetModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "35", "50%", "55%", "90%"], []);

  // Present the modal when `isVisible` changes to true
  React.useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={3}
      snapPoints={snapPoints}
      onDismiss={onClose}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      {children}
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;
