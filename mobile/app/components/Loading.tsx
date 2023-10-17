import { Spinner, ISpinnerProps } from "native-base";
import { FC } from "react";

interface LoadingProps extends ISpinnerProps {}

export const Loading: FC<LoadingProps> = (props) => {
  const { color = "green.500", ...rest } = props;
  return <Spinner color={color} {...rest} />;
};
