import { Button as NBButton, IButtonProps, Text } from "native-base";
import { FC } from "react";

interface ButtonProps extends Omit<IButtonProps, "variant"> {
  title?: string;
  variant?: "solid" | "outline";
}

export const Button: FC<ButtonProps> = (props) => {
  const { title, variant = "solid", isDisabled, ...rest } = props;

  return (
    <NBButton
      variant={variant}
      w={"full"}
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      android_ripple={{
        color: "green.500",
      }}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={variant === "outline" ? "green.500" : "transparent"}
      rounded={"sm"}
      _disabled={{
        bg: "green.700",
        opacity: 0.5,
      }}
      _loading={{
        bg: "green.700",
        opacity: 1,
      }}
      _pressed={{
        bg: "green.700",
      }}
      {...rest}
      isDisabled={isDisabled}
    >
      {title}
    </NBButton>
  );
};
