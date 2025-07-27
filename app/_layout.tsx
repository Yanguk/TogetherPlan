import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";

import SettingsScreen from "~/app/settings";
import HomeScreen from "~/app/index";
import CalendarScreen from "~/app/calendar";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "left",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "index") {
              iconName = "home";
            } else if (route.name === "settings") {
              iconName = "settings";
            } else if (route.name === "calendar") {
              iconName = "calendar";
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen
          name="index"
          component={HomeScreen}
          options={{ title: "홈" }}
        />
        <Tab.Screen
          name="calendar"
          component={CalendarScreen}
          options={{ title: "캘린더" }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{ title: "설정" }}
        />
      </Tab.Navigator>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
