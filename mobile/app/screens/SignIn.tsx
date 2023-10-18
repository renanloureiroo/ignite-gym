import {
  Center,
  Heading,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from "native-base";

import BackgroundImage from "@assets/background.png";

import { Input } from "@components/Input";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProps } from "@routes/auth.routes";
import { useAuth } from "@shared/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { AppError } from "@shared/utils/AppError";
import { Keyboard } from "react-native";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormData = {
  email: string;
  password: string;
};

export const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { navigate } = useNavigation<AuthStackNavigationProps<"SignIn">>();

  const handleNavigateToSignUp = () => {
    navigate("SignUp");
  };

  const handleSignIn = async ({ email, password }: FormData) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      const isAxiosError = error instanceof AppError;

      show({
        title: isAxiosError
          ? error.message
          : "Não foi possível entrar. Tente novamente mais tarde!",
        backgroundColor: "red.500",
        placement: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            Acesse sua conta
          </Heading>
          <VStack w={"full"} space={4}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isError={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isError={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </VStack>

          <Center mt={24} w={"full"}>
            <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
              Ainda não tem acesso?
            </Text>
            <Button
              title="Criar conta"
              variant={"outline"}
              onPress={handleNavigateToSignUp}
            />
          </Center>
        </Center>
      </VStack>
    </ScrollView>
  );
};
