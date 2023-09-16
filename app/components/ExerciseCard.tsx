import { HStack, Heading, Image, Text, VStack, useTheme } from "native-base";
import { ComponentProps, FC } from "react";
import { Pressable } from "react-native";
import { Icon } from "./Icon";

import { AntDesign } from "@expo/vector-icons";

interface ExerciseCardProps extends ComponentProps<typeof Pressable> {
  data: {
    title: string;
    description: string;
    image: string;
  };
}

export const ExerciseCard: FC<ExerciseCardProps> = (props) => {
  const {
    data: { title, description, image },
    ...rest
  } = props;
  const { colors } = useTheme();
  return (
    <Pressable
      {...rest}
      android_ripple={{
        color: colors["gray"][300],
      }}
      style={({ pressed }) => {
        return {
          borderRadius: 8,
          backgroundColor: colors.gray[500],
          overflow: "hidden",
          opacity: pressed ? 0.7 : 1,
        };
      }}
    >
      <HStack p={"2"} space={4} alignItems={"center"}>
        <Image
          source={{
            uri: image,
          }}
          alt="Imagem ilustrativa do exercício"
          width={16}
          height={16}
          resizeMode="contain"
          rounded={"md"}
        />
        <VStack flexGrow={1}>
          <Heading fontSize={"lg"} fontFamily={"heading"}>
            {title}
          </Heading>
          <Text fontSize={"xs"}>{description}</Text>
        </VStack>

        <Icon as={AntDesign} name="right" color={"gray.300"} size={6} />
      </HStack>
    </Pressable>
  );
};
