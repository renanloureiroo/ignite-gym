import { NativeBaseProvider } from "native-base";
import { FC, ReactNode } from "react";

import { theme } from "@shared/theme";
import { AppRoutes } from "@routes/app.routes";

export const AppProviders = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AppRoutes />
    </NativeBaseProvider>
  );
};
