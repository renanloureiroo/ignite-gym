import { Icon } from "@components/Icon";
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HomeStackNavigationProps,
  HomeStackRouterProps,
} from "@routes/home.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { getExerciseById, postExerciseComplete } from "@shared/services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "app/dtos/ExerciseDTO";
import { config } from "@shared/config";
import { Loading } from "@components/Loading";
import { AppError } from "@shared/utils/AppError";

export const ExerciseScreen = () => {
  const [exercise, setExercise] = useState<ExerciseDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [
    submitingRegisterExerciseComplete,
    setSubmitingRegisterExerciseComplete,
  ] = useState<boolean>(false);
  const {
    params: { id },
  } = useRoute<HomeStackRouterProps<"Exercise">>();
  const { goBack, navigate } =
    useNavigation<HomeStackNavigationProps<"Exercise">>();

  const { show } = useToast();

  const fetchExercise = async () => {
    try {
      const { data } = await getExerciseById(id);

      setExercise(data);
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Houve um erro ao carregar o exercício.";
      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHitoryRegiterComplete = async () => {
    setSubmitingRegisterExerciseComplete(true);
    try {
      await postExerciseComplete({
        exercise_id: id,
      });

      show({
        title: `Exercício ${exercise?.name} realizado!`,
        placement: "top",
        bgColor: "green.500",
      });

      navigate("Home");
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Não foi possível salvar o registro do exercício.";
      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSubmitingRegisterExerciseComplete(false);
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  useEffect(() => {
    fetchExercise();
  }, [id]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loading size={56} />
      </Center>
    );
  }
  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <Icon
          onPress={handleGoBack}
          as={Feather}
          name="arrow-left"
          color={"green.500"}
          size={6}
        />

        <HStack
          justifyContent={"space-between"}
          mt={4}
          alignItems={"center"}
          mb={8}
        >
          <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1}>
            {exercise?.name}
          </Heading>

          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color={"gray.200"} ml={1} textTransform={"capitalize"}>
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded={"lg"} overflow={"hidden"} mb={"3"}>
            <Image
              w={"full"}
              h={80}
              alt="Nome do exercício"
              resizeMode="cover"
              source={{
                uri: `${config.baseURL}/exercise/demo/${exercise?.demo}`,
              }}
            />
          </Box>

          <Box bg="gray.600" rounded={"md"} px={4} pb={4}>
            <HStack
              justifyContent={"space-around"}
              alignItems={"center"}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color={"gray.200"} ml={2}>
                  {exercise?.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color={"gray.200"} ml={2}>
                  {exercise?.repetitions} x
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
              isLoading={submitingRegisterExerciseComplete}
              onPress={handleExerciseHitoryRegiterComplete}
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
