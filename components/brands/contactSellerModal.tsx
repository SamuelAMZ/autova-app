import React, { useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemedText from "../ThemedText";

interface ModalProps {
  openModal: () => void;
  closeModal: () => void;
  bottomSheetRef: any;
}

const ContactSellerModalView = ({
  openModal,
  closeModal,
  bottomSheetRef,
}: ModalProps) => {
  // variables
  const snapPoints = useMemo(() => ["30%", "50%", "70%", "90%", "100%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <BottomSheet
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          ref={bottomSheetRef}
          // onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ContactSellerModalView;
