import React, { useRef, useMemo, ReactNode } from "react";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// Define the props interface
interface CustomBottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: string[];
  children: ReactNode;
  index?: number;
}

// Reusable BottomSheet Component
const CustomBottomSheetModal = ({
  isVisible,
  onClose,
  children,
  snapPoints,
  index,
}: CustomBottomSheetModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const _snapPoints = useMemo(() => ["70%", "80%", "100%"], []);

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
      index={index ?? 1}
      snapPoints={snapPoints || _snapPoints}
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
