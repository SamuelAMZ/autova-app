import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr } from "./translations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORE_LANGUAGE_KEY = "settings.lang";

class LanguageDetector {
  type: "languageDetector" = "languageDetector";
  async: boolean = true;

  init = () => {};

  detect = async (callback: (lang: string) => void) => {
    try {
      // get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use english
          return callback("en");
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  };

  cacheUserLanguage = async (language: string) => {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  };
}

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  .use({
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: (callback: (lang: string) => void) => {
      new LanguageDetector().detect(callback);
    },
    cacheUserLanguage: (language: string) => {
      new LanguageDetector().cacheUserLanguage(language);
    },
  })
  .init({
    resources,
    compatibilityJSON: "v3",
    lng: "en",
    // fallback language is set to english
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

export default i18n;

export async function getLangage() {
  try {
    const langage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
    return langage || "en";
  } catch (e) {
    console.log(e, "getLangage");
    return "en";
  }
}
