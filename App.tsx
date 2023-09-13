import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";

import { useFontsLoaded } from "@hooks/index";

import { AppProviders } from "@shared/providers";

import { usePersistenceNavigation } from "@shared/hooks/usePersistenceNavigation";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
]);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontError, fontsLoaded, onLayoutRootView } = useFontsLoaded({
    hidAsyncSplashScreen: SplashScreen.hideAsync,
  });

  const { isReady, initialState, onStateChange } = usePersistenceNavigation({
    key: "ignite_gym:navigation_state",
  });

  if (!fontsLoaded || fontError || !isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AppProviders
        initialState={initialState}
        onStateChange={onStateChange}
        onLayoutRootView={onLayoutRootView}
      />
    </>
  );
}
