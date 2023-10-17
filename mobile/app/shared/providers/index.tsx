import { NativeBaseProvider } from "native-base";

import { theme } from "@shared/theme";

import { InitialState } from "@react-navigation/native";
import { FC } from "react";

import { MainRoutes } from "@routes/main.routes";
import { AuthContextProvider } from "../../context/AuthContext";

interface AppRoutesProps {
  initialState?: InitialState;
  onStateChange?: (state: any) => void;
  onLayoutRootView?: () => void;
}

export const AppProviders: FC<AppRoutesProps> = (props) => {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <MainRoutes {...props} />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};
