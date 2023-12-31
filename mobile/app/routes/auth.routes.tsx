import { NavigationProp, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen, SignUpScreen } from "@screens/index";

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackRouteProps<T extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  T
>;

export type AuthStackNavigationProps<T extends keyof AuthStackParamList> =
  NavigationProp<AuthStackParamList, T>;

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
};
