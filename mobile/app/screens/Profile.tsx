import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHedear";
import {
  Center,
  ScrollView,
  Text,
  VStack,
  Skeleton,
  Pressable,
  Heading,
  useToast,
} from "native-base";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const ProfileScreen = () => {
  const [photIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");

  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (canceled || !assets[0].uri) return;

      const photoInfo = await FileSystem.getInfoAsync(assets[0].uri);

      if (!photoInfo.exists) return;

      const size = photoInfo.size / 1024 / 1024; // MB

      if (size > 5)
        return toast.show({
          title: "Essa imagem é muito grande. Escolha uma de até 5MB",
          placement: "top",
          bgColor: "red.500",
        });

      setPhoto(assets[0].uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photIsLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <Avatar size="large" photo={photo} />
          )}

          <Pressable
            _pressed={{
              opacity: 0.7,
            }}
            onPress={handleUserPhotoSelect}
          >
            <Text
              mt={2}
              color={"green.500"}
              fontSize={"md"}
              fontWeight={"bold"}
              mb={8}
            >
              Alterar foto
            </Text>
          </Pressable>
          <VStack w={"full"} space={4}>
            <Input placeholder="Nome" bg={"gray.600"} />
            <Input placeholder="E-mail" bg={"gray.600"} />
          </VStack>
        </Center>
        <VStack mt={12} mb={9} px={10} space={4}>
          <Heading color={"gray.200"} fontSize={"md"} fontFamily={"body"}>
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" bg={"gray.600"} secureTextEntry />
          <Input placeholder="Nova senha" bg={"gray.600"} secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg={"gray.600"}
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
