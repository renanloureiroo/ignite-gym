import { HomeHeader } from "@components/HomeHeader";
import { Center, Text } from "native-base";

export const HomeScreen = () => {
  return (
    <Center flex={1}>
      <HomeHeader />
      <Text color={"gray.100"}>Home</Text>
    </Center>
  );
};
