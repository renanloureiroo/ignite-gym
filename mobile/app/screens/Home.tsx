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
  useToast,
} from "native-base";
import { useEffect, useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProps } from "@routes/home.routes";
import { getGroups, getExercises } from "@shared/services/api/index";
import { AppError } from "@shared/utils/AppError";

import { ExerciseDTO } from "app/dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const { navigate } = useNavigation<HomeStackNavigationProps<"Home">>();

  const { show } = useToast();

  const handleSelect = (item: string) => {
    setSelected(item);
  };

  const handleOpenExerciseDetails = (id: number) => {
    navigate("Exercise", {
      id,
    });
  };

  const fetchGroups = async () => {
    try {
      const { data } = await getGroups();
      setGroups(data);
      setSelected(data[0]);
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Houve um erro ao carregar os grupos musculares.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const fetchExercisesByGroup = async () => {
    setIsLoading(true);
    try {
      const { data } = await getExercises(selected as string);

      setExercises(data);
    } catch (error) {
      console.log(error);
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Houve um erro ao carregar os exercícios.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selected) {
      fetchExercisesByGroup();
    }
  }, [selected]);

  return (
    <VStack flex={1}>
      <HomeHeader />
      <VStack flex={1}>
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
            {groups.length > 0 &&
              groups.map((group, index) => (
                <Select
                  key={`${group.toLowerCase()}-${index}}`}
                  title={group}
                  onPress={() => handleSelect(group)}
                  selected={selected === group}
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

        {isLoading ? (
          <Center flex={1}>
            <Loading size={32} />
          </Center>
        ) : (
          <VStack px={"8"}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={"5"}
            >
              <Heading fontSize={"md"} color={"gray.100"} fontFamily={"body"}>
                Exercícios
              </Heading>

              <Text color={"gray.200"} fontSize={"sm"}>
                {exercises.length}
              </Text>
            </HStack>

            <FlatList
              data={exercises}
              contentContainerStyle={{
                gap: 12,
              }}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)}
                />
              )}
            />
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};
