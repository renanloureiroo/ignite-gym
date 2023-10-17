import { HStack, Heading, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";

import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "./Icon";
import { useAuth } from "@shared/hooks/useAuth";
import { useState } from "react";

export const HomeHeader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
        <Avatar photo={user?.avatar} />
        <VStack justifyContent={"center"}>
          <Text color={"gray.100"} fontFamily={"body"} fontSize={"md"}>
            Olá,
          </Text>
          <Heading fontSize={"md"} fontFamily={"heading"} color={"gray.100"}>
            {user.name}
          </Heading>
        </VStack>
      </HStack>

      <Icon
        as={MaterialIcons}
        name="logout"
        size={"7"}
        onPress={handleSignOut}
        disabled={isLoading}
      />
    </HStack>
  );
};
