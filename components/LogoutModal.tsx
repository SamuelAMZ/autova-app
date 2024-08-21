import { Modal, TouchableWithoutFeedback } from "react-native";
import useStatusBar from "@/hooks/useStatusBar";
import { View, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";

import { router } from "expo-router";

export const LogoutModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: any;
}) => {
  // set status bar
  useStatusBar("dark-content", "#0F172A8F", false);

  return (
    <>
      <Modal transparent={true} visible={visible} animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 bg-[#0F172A8F] items-center justify-center px-[15px]">
            <TouchableWithoutFeedback>
              <View
                className="bg-white flex gap-[24px] w-full rounded-[12px] "
                style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <View className="flex gap-[12px]">
                  <ThemedText className="text-[#101828] text-[16px] text-center">
                    Are you sure you want to Logout?
                  </ThemedText>
                </View>
                <View className="flex-row flex justify-center items-center gap-[12px]">
                  <TouchableOpacity
                    className={`  bg-[#5856D6] border-solid border-2 border-[#5856D6]  rounded-[50px] `}
                    style={{ paddingHorizontal: 28, paddingVertical: 10 }}>
                    <ThemedText
                      className={`text-[#FFFFFF] text-[17px]  text-center  `}>
                      Yes
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`  border-solid border border-[#5856D6] rounded-[50px] `}
                    onPress={onClose}
                    style={{ paddingHorizontal: 28, paddingVertical: 10 }}>
                    <ThemedText
                      className={`text-[#5856D6] text-[17px]  text-center  `}>
                      No
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
