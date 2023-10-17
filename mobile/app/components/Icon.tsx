import { Icon as NBIcon, IIconProps, useTheme, Pressable } from "native-base";
import { FC } from "react";

interface IconProps extends IIconProps {}

export const Icon: FC<IconProps> = (props) => {
  const { onPress, size = 6, ...rest } = props;

  const { colors } = useTheme();

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: colors.gray[400],
          borderless: true,
        }}
        w={size}
        height={size}
      >
        {({ isPressed }) => (
          <NBIcon opacity={isPressed ? 0.7 : 1} size={size} {...rest} />
        )}
      </Pressable>
    );
  }

  return <NBIcon {...rest} />;
};
