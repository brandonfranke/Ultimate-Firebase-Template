import { FIREBASE_ERRORS } from "@constants/index";
import { ThemeSettings } from "@custom-types/types";
import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";

export * from "ahooks";

export const useFirebaseError = () => {
  return {
    getFirebaseErrorMessage: (error: any): string => {
      return FIREBASE_ERRORS[error.code] ?? FIREBASE_ERRORS["default"];
    },
  };
};

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorageState<ThemeSettings>("theme");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme-mode",
      theme?.mode ?? "light",
    );
    document.documentElement.setAttribute(
      "data-theme-color",
      theme?.color ?? "default",
    );
  }, [theme?.mode, theme?.color]);

  return {
    theme,
    setTheme: (value: ThemeSettings) => setTheme({ ...theme, ...value }),
  };
};
