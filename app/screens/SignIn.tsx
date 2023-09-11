import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";

import BackgroundImage from "@assets/background.png";

import { Input } from "@components/Input";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";

import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@routes/Auth.routes";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

type SignInScreenRouteProp = NativeStackScreenProps<
  AuthStackParamList,
  "SignIn"
>;

export const SignIn = () => {
  const { push } = useNavigation<SignInScreenNavigationProp>();

  const handleNavigateToSignUp = () => {
    push("SignUp");
  };

  return (
    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false}>
      <VStack flex={1} paddingX={10}>
        <Image
          source={BackgroundImage}
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
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input placeholder="Senha" secureTextEntry />

            <Button title="Acessar" />
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
