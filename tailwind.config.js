/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        jakarta_regular: "PlusJakartaSans_400Regular",
        jakarta_xtraLight: "PlusJakartaSans_200ExtraLight",
        jakarta_light: "PlusJakartaSans_300Light",
        jakarta_medium: "PlusJakartaSans_500Medium",
        jakarta_semiBold: "PlusJakartaSans_600SemiBold",
        jakarta_bold: "PlusJakartaSans_700Bold",
        jakarta_xtraBold: "PlusJakartaSans_800ExtraBold",
      },
    },
  },
  plugins: [],
};
