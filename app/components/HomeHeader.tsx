import { HStack, Heading, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";

import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "./Icon";

export const HomeHeader = () => {
  return (
    <HStack
      w="full"
      bg={"gray.600"}
      paddingX={"8"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingTop={"16"}
      paddingBottom={"5"}
    >
      <HStack space={"4"} alignItems={"center"}>
        <Avatar photo="https://github.com/renanloureiroo.png" />
        <VStack justifyContent={"center"}>
          <Text color={"gray.100"} fontFamily={"body"} fontSize={"md"}>
            Olá,
          </Text>
          <Heading fontSize={"md"} fontFamily={"heading"} color={"gray.100"}>
            Renan Loureiro
          </Heading>
        </VStack>
      </HStack>

      <Icon
        as={MaterialIcons}
        name="logout"
        size={"7"}
        onPress={() => console.log("chamou")}
      />
    </HStack>
  );
};
