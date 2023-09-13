import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useCallback } from "react";

interface IUseFontsLoaded {
  hidAsyncSplashScreen: () => Promise<boolean>;
}
export const useFontsLoaded = (props: IUseFontsLoaded) => {
  const { hidAsyncSplashScreen } = props;
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const success = await hidAsyncSplashScreen();
      console.log("HIDE_SPLASH_SCREEN", success);
    }
  }, [fontsLoaded, fontError]);

  return {
    fontsLoaded,
    fontError,
    onLayoutRootView,
  };
};
