import { Button as NBButton, IButtonProps, Text } from "native-base";
import { FC } from "react";

interface ButtonProps extends Omit<IButtonProps, "variant"> {
  title?: string;
  variant?: "solid" | "outline";
}

export const Button: FC<ButtonProps> = (props) => {
  const { title, variant = "solid", ...rest } = props;

  return (
    <NBButton
      variant={variant}
      w={"full"}
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={variant === "outline" ? "green.500" : "transparent"}
      rounded={"sm"}
      _pressed={{
        bg: "green.500",
      }}
      {...rest}
    >
      {title}
    </NBButton>
  );
};
