import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Box, useTheme } from "native-base";
import { AuthStack } from "./auth.routes";

export const AppRoutes = () => {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthStack />
      </NavigationContainer>
    </Box>
  );
};
