import { Input as NBInput, IInputProps, FormControl } from "native-base";
import { FC } from "react";

interface InputProps extends IInputProps {
  isError?: boolean;
  errorMessage?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { isError = false, errorMessage = null, ...rest } = props;

  const isInvalid = !!errorMessage || isError;
  return (
    <FormControl isInvalid={isInvalid}>
      <NBInput
        isInvalid={isInvalid}
        bg={"gray.700"}
        placeholderTextColor={"gray.300"}
        h={14}
        px={4}
        borderWidth={isError ? 1 : 0}
        borderColor={isError ? "red.500" : "transparent"}
        fontSize={"md"}
        color={"white"}
        _focus={{
          borderWidth: 1,
          borderColor: isError ? "red.500" : "green.500",
          bg: "gray.700",
          selectionColor: isError ? "red.500" : "green.500",
        }}
        _disabled={{
          placeholderTextColor: "gray.300",
          color: "gray.300",
          bg: "gray.700",
          opacity: 1,
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};
