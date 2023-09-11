import { NativeBaseProvider } from "native-base";
import { FC, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { theme } from "@shared/theme";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider>
  );
};
