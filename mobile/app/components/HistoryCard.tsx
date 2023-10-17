import { HStack, Heading, Text, VStack } from "native-base";
import { FC } from "react";

interface HistoryCardProps {
  data: {
    group: string;
    name: string;
    hour: string;
  };
}

export const HistoryCard: FC<HistoryCardProps> = (props) => {
  const {
    data: { group, name, hour },
  } = props;
  return (
    <HStack
      bg="gray.600"
      w={"full"}
      rounded={"md"}
      px="5"
      py={"4"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={3}
    >
      <VStack mr={5} flexGrow={1} flexShrink={1}>
        <Heading
          color={"white"}
          fontSize={"md"}
          numberOfLines={1}
          textTransform={"capitalize"}
        >
          {group}
        </Heading>
        <Text fontSize={"lg"} numberOfLines={1}>
          {name}
        </Text>
      </VStack>

      <Text color={"gray.300"} fontSize={"md"}>
        {hour}
      </Text>
    </HStack>
  );
};
