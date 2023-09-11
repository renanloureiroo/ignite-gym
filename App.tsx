import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";

import { useFontsLoaded } from "@hooks/index";

import { AppProviders } from "@shared/Providers";
import { Loading } from "@components/Loading";
import { Box, Center } from "native-base";

import { AuthStack } from "@routes/Auth.routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontError, fontsLoaded, onLayoutRootView } = useFontsLoaded({
    hidAsyncSplashScreen: SplashScreen.hideAsync,
  });

  if (!fontError && !fontsLoaded) {
    return (
      <AppProviders>
        <Center flex={1}>
          <Loading />
        </Center>
      </AppProviders>
    );
  }

  return (
    <AppProviders>
      <Box onLayout={onLayoutRootView} flex={1} bg={"gray.700"}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <AuthStack />
      </Box>
    </AppProviders>
  );
}
