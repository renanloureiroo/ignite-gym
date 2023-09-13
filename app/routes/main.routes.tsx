import {
  DefaultTheme,
  NavigationContainer,
  InitialState,
} from "@react-navigation/native";

import { Box, useTheme } from "native-base";

import { FC } from "react";
import { AppRoutes } from "./app.routes";

interface AppRoutesProps {
  initialState?: InitialState;
  onStateChange?: (state: any) => void;
  onLayoutRootView?: () => void;
}

export const MainRoutes: FC<AppRoutesProps> = (props) => {
  const { initialState, onStateChange, onLayoutRootView } = props;
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700" onLayout={onLayoutRootView}>
      <NavigationContainer
        theme={theme}
        initialState={initialState ?? undefined}
        onStateChange={onStateChange}
      >
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
};
