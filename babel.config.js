module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./app"],
          alias: {
            "@": "./app",
            "@components": "./app/components",
            "@shared": "./app/shared",
            "@utils": "./app/shared/utils",
            "@services": "./app/shared/services",
            "@hooks": "./app/shared/hooks",
            "@screens": "./app/screens",
          },
        },
      ],
    ],
  };
};
