import { InitialState } from "@react-navigation/native";
import { storage } from "@shared/services/storage";
import { useEffect, useState } from "react";
import { config } from "@shared/config";

interface IPersistenceNavigationParams {
  key: string;
  defaultValue?: InitialState;
}

export const usePersistenceNavigation = (
  params: IPersistenceNavigationParams
) => {
  const { key, defaultValue } = params;
  const [isReady, setIsReady] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<InitialState>();

  const isPersistenceEnabled = () => {
    if (config.persistenceNavigation === "dev" && __DEV__) return true;
    if (config.persistenceNavigation === "prod" && !__DEV__) return true;
    return false;
  };

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await storage.get<InitialState>(key);
        const state = savedStateString ?? defaultValue;

        const isPersistence = isPersistenceEnabled();
        if (!isPersistence) return;
        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const onStateChange = (state: InitialState | undefined) => {
    const isPersistence = isPersistenceEnabled();
    if (!isPersistence) return;

    if (state) {
      storage.save(key, state);
    }
  };

  return { initialState, onStateChange, isReady };
};
