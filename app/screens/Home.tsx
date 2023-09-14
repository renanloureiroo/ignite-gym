import { HomeHeader } from "@components/HomeHeader";
import { Select } from "@components/Select";
import {
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";

export const HomeScreen = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = () => {
    setSelected((oldState) => !oldState);
  };
  return (
    <VStack flex={1}>
      <HomeHeader />
      <VStack>
        <Box marginY={"10"}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
              gap: 12,
              paddingHorizontal: 32,
            }}
            showsHorizontalScrollIndicator={false}
            position={"relative"}
          >
            <Select title="Ombro" onPress={handleSelect} selected={selected} />
            <Select title="Bíceps" onPress={handleSelect} />
            <Select title="Tríceps" onPress={handleSelect} />
            <Select title="Costas" onPress={handleSelect} />
          </ScrollView>

          <Box
            height={"100%"}
            w={"12"}
            h={"12"}
            position={"absolute"}
            right={0}
          >
            <LinearGradient
              start={{
                x: 0,
                y: 1,
              }}
              end={{
                x: 1,
                y: 1,
              }}
              colors={["transparent", "rgba(18,18,20,1)"]}
            >
              <Box w={"full"} h={"full"} />
            </LinearGradient>
          </Box>
        </Box>
        <VStack px={"8"}>
          <Heading fontSize={"md"} color={"gray.100"} fontFamily={"body"}>
            Exercícios
          </Heading>
        </VStack>
      </VStack>
    </VStack>
  );
};
