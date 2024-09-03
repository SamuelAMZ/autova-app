import { View } from "react-native";
import ThemedText from "./ThemedText";
import Colors from "@/constants/Colors";

const TermsOfServices = () => {
  return (
    <View>
      <ThemedText
        className={` text-[${Colors.textSecondary}] text-[13px] font-[400]`}
      >
        By signing up, you agree to our
        <ThemedText
          className={`text-[${Colors.textTertiary}] font-[500] underline`}
          style={{ fontFamily: "SpaceGrotesk_500Medium" }}
        >
          {" Terms of Service"}
        </ThemedText>
        {" and "}
        <ThemedText
          className={`text-[${Colors.textTertiary}] font-[500] underline`}
          style={{ fontFamily: "SpaceGrotesk_500Medium" }}
        >
          Privacy Policy
        </ThemedText>
        {" for creating your account. "}
      </ThemedText>
      <ThemedText
        className={` text-[${Colors.textSecondary}] text-[13px] font-[400]`}
      >
        Are you dealer? Create a
        <ThemedText
          className={`text-[${Colors.textTertiary}] font-[500]`}
          style={{ fontFamily: "SpaceGrotesk_500Medium" }}
        >
          {" dealer account "}
        </ThemedText>
        instead.
      </ThemedText>
    </View>
  );
};

export default TermsOfServices;
