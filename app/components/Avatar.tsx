import { FC } from "react";
import AvatarDefault from "@assets/userPhotoDefault.png";

import { Image } from "native-base";

interface AvatarProps {
  photo?: string;
  size?: "small" | "medium" | "large";
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { photo, size = "small" } = props;

  const sizeFinal = size === "small" ? 16 : 33;

  return (
    <Image
      source={photo ? { uri: photo } : AvatarDefault}
      w={sizeFinal}
      h={sizeFinal}
      rounded={"full"}
      borderWidth={1}
      borderColor={"gray.400"}
      alt="Avatar"
    />
  );
};
