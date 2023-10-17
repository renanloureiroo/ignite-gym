import {
  createBottomTabNavigator,
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { HistoryScreen, ProfileScreen } from "@screens/index";
import { useTheme } from "native-base";

import HomeIcon from "@assets/home.svg";
import ProfileIcon from "@assets/profile.svg";
import HistoryIcon from "@assets/history.svg";
import { Platform } from "react-native";
import { HomeStack } from "./home.routes";

type AppRoutesParamList = {
  HomeStack: undefined;
  Exercise: undefined;
  Profile: undefined;
  History: undefined;
};

export type AppRoutesRouterProps<T extends keyof AppRoutesParamList> =
  BottomTabScreenProps<AppRoutesParamList, T>;

export type AppRoutesNavigationProps<T extends keyof AppRoutesParamList> =
  BottomTabNavigationProp<AppRoutesParamList, T>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export const AppRoutes = () => {
  const { colors, sizes } = useTheme();

  const iconSize = sizes["6"];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 96 : "auto",
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
      initialRouteName="HomeStack"
    >
      <Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: (props) => (
            <HomeIcon fill={props.color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: (props) => (
            <HistoryIcon
              fill={props.color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => (
            <ProfileIcon
              fill={props.color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
    </Navigator>
  );
};
