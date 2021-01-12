const path = require("path");
const dotenv = require("dotenv");
const { DefinePlugin } = require("webpack");

// Get the root path (assuming your webpack config is in the root of your project!)
const currentPath = path.join(__dirname);

// Create the fallback path (the production .env)
const basePath = currentPath + "/.env";

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config({ path: basePath }).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  // TODO: Explain Source Map
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new DefinePlugin(envKeys)],
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build", "js"),
  },
};
