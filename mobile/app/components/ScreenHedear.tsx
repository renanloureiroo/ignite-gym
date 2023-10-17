import { Center, Heading } from "native-base";
import { FC } from "react";

interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader: FC<ScreenHeaderProps> = (props) => {
  const { title } = props;
  return (
    <Center bg={"gray.600"} pb={6} pt={16}>
      <Heading fontSize={"xl"}>{title}</Heading>
    </Center>
  );
};
