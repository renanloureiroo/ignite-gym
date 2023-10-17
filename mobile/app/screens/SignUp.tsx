import {
  Center,
  Heading,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BackgroundImage from "@assets/background.png";

import { Input } from "@components/Input";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProps } from "@routes/auth.routes";

import { useState } from "react";

import { createUser } from "@shared/services/api";
import axios from "axios";
import { AppError } from "@shared/utils/AppError";
import { Alert } from "react-native";
import { useAuth } from "@shared/hooks/useAuth";
import { UserDTO } from "@dtos/*";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirm_password: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

export const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const { goBack } = useNavigation<AuthStackNavigationProps<"SignUp">>();

  const handleGoBack = () => {
    goBack();
  };

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      await createUser({
        name,
        email,
        password,
      });

      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde!";

      toast.show({
        title: title,
        bgColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
      <VStack flex={1} paddingX={10}>
        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Mulheres fazendo cárdio"
          resizeMode="contain"
          position={"absolute"}
        />
        <Center my={24}>
          <Logo />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            fontSize={"xl"}
            color={"gray.100"}
            mb={6}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>
          <VStack w={"full"} space={4}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome"
                  autoCapitalize="words"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  isError={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Informe um e-mail",
                pattern: {
                  value: /ˆ[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  isError={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCorrect={false}
                  isError={!!errors[name]}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCorrect={false}
                  isError={!!errors[name]}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={onSubmit}
              isLoading={isLoading}
            />
          </VStack>

          <Center mt={24} w={"full"}>
            <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
              Ainda não tem acesso?
            </Text>
            <Button
              title="Voltar para o login"
              variant={"outline"}
              onPress={handleGoBack}
            />
          </Center>
        </Center>
      </VStack>
    </ScrollView>
  );
};
