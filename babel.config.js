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
            "@components": "./app/components",
            "@routes": "./app/routes",
            "@assets": "./app/assets",
            "@shared": "./app/shared",
            "@utils": "./app/shared/utils",
            "@services": "./app/shared/services",
            "@screens": "./app/screens",
            "@hooks": "./app/shared/hooks",
          },
        },
      ],
    ],
  };
};
