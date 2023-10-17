import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { ComponentProps, FC } from "react";
import { Pressable } from "react-native";
import { Icon } from "./Icon";

import { AntDesign } from "@expo/vector-icons";
import { ExerciseDTO } from "../dtos/ExerciseDTO";
import { config } from "@shared/config";

interface ExerciseCardProps extends ComponentProps<typeof Pressable> {
  data: ExerciseDTO;
}

export const ExerciseCard: FC<ExerciseCardProps> = (props) => {
  const {
    data: { name, repetitions, series, thumb },
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
      <Box
        flexDirection={"row"}
        flex={1}
        p={"2"}
        pr={"4"}
        alignItems={"center"}
      >
        <Image
          source={{
            uri: `${config.baseURL}/exercise/thumb/${thumb}`,
          }}
          alt="Imagem ilustrativa do exercício"
          width={16}
          height={16}
          mr={"4"}
          resizeMode="cover"
          rounded={"md"}
        />
        <Box flex={1} mr={"4"}>
          <Heading fontSize={"lg"} fontFamily={"heading"} numberOfLines={1}>
            {name}
          </Heading>
          <Text
            fontSize={"xs"}
          >{`${series} séries x ${repetitions} repetições`}</Text>
        </Box>

        <Icon as={AntDesign} name="right" color={"gray.300"} size={6} />
      </Box>
    </Pressable>
  );
};
