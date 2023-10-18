type Config = {
  persistenceNavigation: "dev" | "prod" | "never";
  baseURL: string;
};

export const config: Config = {
  persistenceNavigation: "never",
  baseURL: "http://172.20.10.2:3333",
};
