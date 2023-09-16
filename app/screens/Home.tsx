import { HomeHeader } from "@components/HomeHeader";
import { Select } from "@components/Select";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { ExerciseCard } from "@components/ExerciseCard";

type Exercise = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const exercises: Array<Exercise> = [
  {
    id: "puxada-frontal",
    title: "Puxada frontal",
    description: "3 series x 12 repetições",
    image: "https://github.com/renanloureiroo.png",
  },

  {
    id: "remada-curvada",
    title: "Remada curvada",
    description: "3 series x 12 repetições",
    image: "https://github.com/renanloureiroo.png",
  },
  {
    id: "levamtaento-terra",
    title: "Levamtaento terra",
    description: "3 series x 12 repetições",
    image: "https://github.com/renanloureiroo.png",
  },
];

type Group = {
  id: string;
  title: string;
};

const groups: Array<Group> = [
  {
    id: "ombro",
    title: "Ombro",
  },
  {
    id: "biceps",
    title: "Bíceps",
  },
  {
    id: "triceps",
    title: "Tríceps",
  },
  {
    id: "costas",
    title: "Costas",
  },
];

export const HomeScreen = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (item: Group) => {
    setSelected(item.id);
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
            {groups.map((group) => (
              <Select
                key={group.id}
                title={group.title}
                onPress={() => handleSelect(group)}
                selected={selected === group.id}
              />
            ))}
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
        <VStack px={"8"} space={3}>
          <Heading fontSize={"md"} color={"gray.100"} fontFamily={"body"}>
            Exercícios
          </Heading>

          <FlatList
            data={exercises}
            contentContainerStyle={{
              gap: 12,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExerciseCard data={item} />}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};
