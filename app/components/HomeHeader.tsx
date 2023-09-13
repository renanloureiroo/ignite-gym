import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";

export const HomeHeader = () => {
  return (
    <HStack>
      <Avatar />
      <VStack>
        <Text color={"gray.100"}>Olá,</Text>
        <Heading color={"gray.100"}>Renan Loureiro</Heading>
      </VStack>

      <Icon name="" />
    </HStack>
  );
};
