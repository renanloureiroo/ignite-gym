import { NativeBaseProvider } from "native-base";
import { FC, ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};
