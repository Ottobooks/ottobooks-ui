module.exports = {
  apps: [
    {
      name: "ottobooks-ui",
      script: "./node_modules/.bin/next/dist",
      args: "start -p " + (process.env.PORT || 3000),
      watch: false,
      autorestart: true,
    },
  ],
};
