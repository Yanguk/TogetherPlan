import * as React from "react";
import { View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Text } from "~/components/ui/text";

export default function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>설정 페이지입니다.</Text>

      <View className="h-5 mt-5">
        <ThemeToggle />
      </View>
    </View>
  );
}
