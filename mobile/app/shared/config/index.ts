type Config = {
  persistenceNavigation: "dev" | "prod" | "never";
  baseURL: string;
};

export const config: Config = {
  persistenceNavigation: "never",
  baseURL: "http://192.168.0.102:3333",
};
