import * as React from "react";
import { View } from "react-native";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
            {/* <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} /> */}
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">180일</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              2025. 01. 02 ~
            </CardDescription>
          </View>
        </CardHeader>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button variant="outline" className="shadow shadow-foreground/5">
            <Text>Edit</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
