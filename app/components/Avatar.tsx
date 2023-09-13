import { FC } from "react";
import AvatarDefault from "@assets/userPhotoDefault.png";

interface AvatarProps {
  photo?: string;
  size?: "small" | "medium" | "large";
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { photo } = props;

  return <Avatar photo={"https://github.com/renanloureiroo.png"} />;
};
