require("@babel/register")({
  presets: ["@babel/preset-env"],
});
require("./src/server");
require("./db/jsonServer");
