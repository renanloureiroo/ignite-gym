import { Icon as NBIcon, IIconProps, useTheme } from "native-base";
import { FC } from "react";
import { Pressable } from "react-native";

interface IconProps extends IIconProps {}

export const Icon: FC<IconProps> = (props) => {
  const { onPress, ...rest } = props;

  const { colors } = useTheme();

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: colors.gray[400],
          borderless: true,
        }}
      >
        {({ pressed }) => <NBIcon opacity={pressed ? 0.7 : 1} {...rest} />}
      </Pressable>
    );
  }

  return <NBIcon {...rest} />;
};
