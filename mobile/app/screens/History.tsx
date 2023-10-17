import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHedear";
import { useFocusEffect } from "@react-navigation/native";
import { getHistory } from "@shared/services/api";
import { AppError } from "@shared/utils/AppError";
import { HistoryDTO } from "app/dtos/HistoryDTO";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export const HistoryScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [historyExercises, setHystoryExercises] = useState<HistoryDTO>([]);

  const { show } = useToast();

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data } = await getHistory();
      setHystoryExercises(data);
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Houve um erro ao carregar o histórico.";

      show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList
        px={4}
        sections={historyExercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3}>
            {title}
          </Heading>
        )}
        contentContainerStyle={
          historyExercises.length === 0 && {
            flex: 1,
            justifyContent: "center",
          }
        }
        ListEmptyComponent={() => (
          <Text color={"gray.200"} textAlign={"center"} mt={10}>
            Nenhum exercício realizado
          </Text>
        )}
      />
    </VStack>
  );
};
