import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { useFontsLoaded } from "@hooks/index";

import { AppProviders } from "@shared/Providers";
import { Loading } from "@components/Loading";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontError, fontsLoaded, onLayoutRootView } = useFontsLoaded({
    hidAsyncSplashScreen: SplashScreen.hideAsync,
  });

  if (!(!fontError && !fontsLoaded)) {
    return <Loading />;
  }

  return (
    <AppProviders>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
