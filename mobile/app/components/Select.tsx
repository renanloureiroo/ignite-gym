import { Center, Text, useTheme } from "native-base";
import { ComponentProps, FC } from "react";
import { Pressable } from "react-native";

interface SelectProps extends ComponentProps<typeof Pressable> {
  title: string;
  selected?: boolean;
}

export const Select: FC<SelectProps> = (props) => {
  const { title, selected = false, ...rest } = props;
  const { colors, sizes } = useTheme();
  return (
    <Pressable
      android_ripple={{
        color: colors.green[500],
      }}
      style={{
        borderRadius: sizes["1"],
        overflow: "hidden",
        borderWidth: 1,
        borderColor: selected ? colors.green[500] : "transparent",
        backgroundColor: colors.gray[400],
      }}
      {...rest}
    >
      {({ pressed }) => (
        <Center w={"24"} p={3} opacity={pressed ? 0.7 : 1}>
          <Text fontSize={"xs"} color={selected ? "green.500" : "gray.200"}>
            {title.toUpperCase()}
          </Text>
        </Center>
      )}
    </Pressable>
  );
};
