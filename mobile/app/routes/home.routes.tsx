import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ExerciseScreen } from "@screens/Exercise";
import { HomeScreen } from "@screens/Home";

type HomeStackParamList = {
  Home: undefined;
  Exercise: {
    id: number;
  };
};

export type HomeStackNavigationProps<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export type HomeStackRouterProps<T extends keyof HomeStackParamList> =
  RouteProp<HomeStackParamList, T>;

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();
export const HomeStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Exercise" component={ExerciseScreen} />
    </Navigator>
  );
};
