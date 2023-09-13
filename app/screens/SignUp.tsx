import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";

import BackgroundImage from "@assets/background.png";

import { Input } from "@components/Input";

import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProps } from "@routes/auth.routes";

export const SignUpScreen = () => {
  const { goBack } = useNavigation<AuthStackNavigationProps<"SignUp">>();

  const handleGoBack = () => {
    goBack();
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
            Crie sua conta
          </Heading>
          <VStack w={"full"} space={4}>
            <Input placeholder="Nome" autoCapitalize="words" />
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
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
