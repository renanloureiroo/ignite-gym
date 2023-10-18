import { useCallback, useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
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

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@shared/hooks/useAuth";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IUpdateProfileDTO,
  updateAvatar,
  updateProfile,
} from "@shared/services/api";
import { AppError } from "@shared/utils/AppError";
import { config } from "@shared/config";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@shared/services/api/api";

const schema = yup.object().shape({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required(""),
  old_password: yup.string(),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  password_confirmation: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .when("password", {
      is: (field: any) => field,
      then: (schema) =>
        schema
          .nullable()
          .required("Confirme sua nova senha")
          .transform((value) => (value === "" ? null : value)),
    }),
});

type FormData = {
  name: string;
  email: string;
  old_password?: string;
  password?: string | null;
  password_confirmation?: string | null;
};

export const ProfileScreen = () => {
  const { user, updateUserProfile } = useAuth();
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] =
    useState<boolean>(false);
  const [photIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>(user?.avatar);

  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
      });

      if (canceled || !assets[0].uri) return;

      const photoInfo = await FileSystem.getInfoAsync(assets[0].uri);

      if (!photoInfo.exists) return;

      const size = photoInfo.size / 1024 / 1024; // MB

      if (size > 5) {
        return show({
          title: "Essa imagem é muito grande. Escolha uma de até 5MB",
          placement: "top",
          bgColor: "red.500",
        });
      }
      const fileExtension = photoInfo.uri.split(".").pop();

      const photoFile = {
        name: `${user.id}-${new Date().getTime()}.${fileExtension}`,
        uri: assets[0].uri,
        type: `${assets[0].type}/${fileExtension}`,
      } as any;

      const formData = new FormData();
      formData.append("avatar", photoFile);

      const { data } = await updateAvatar(formData);

      await updateUserProfile({
        ...data,
        avatar: `${config.baseURL}/avatar/${data.avatar}`,
      });

      setPhoto(`${config.baseURL}/avatar/${data.avatar}`);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const onSubmit = async ({ name, password, old_password }: FormData) => {
    setIsLoadingUpdateProfile(true);
    try {
      await updateProfile({
        name,
        password,
        old_password,
      } as IUpdateProfileDTO);

      await updateUserProfile({
        ...user,
        name,
      });

      show({
        title: "Perfil atualizado!",
        bgColor: "green.500",
        placement: "top",
      });
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      const title = isAxiosError
        ? error.message
        : "Não foi possível atualizar o perfil. Tente novamente mais tarde!";

      show({
        title: title,
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsLoadingUpdateProfile(false);
    }
  };

  const formValues = watch();

  const isDisabledButton =
    !(formValues.name !== user.name) || !schema.isValidSync(formValues);

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
            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  bg={"gray.600"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isError={!!errors.name}
                  errorMessage={errors.name?.message}
                  autoCorrect={false}
                  autoCapitalize="words"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  bg={"gray.600"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isDisabled
                  isReadOnly
                />
              )}
            />
          </VStack>
        </Center>
        <VStack mt={12} mb={9} px={10} space={4}>
          <Heading color={"gray.200"} fontSize={"md"} fontFamily={"body"}>
            Alterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                bg={"gray.600"}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                bg={"gray.600"}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={!!value ? value : ""}
                isError={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg={"gray.600"}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={!!value ? value : ""}
                isError={!!errors.password_confirmation}
                errorMessage={errors.password_confirmation?.message}
              />
            )}
          />
          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoadingUpdateProfile}
            isDisabled={isDisabledButton}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
