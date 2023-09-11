import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp } from "@screens/index";
import { useTheme } from "native-base";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.gray[900],
        },
      }}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};
