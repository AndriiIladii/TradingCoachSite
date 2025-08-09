const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
module.exports = {
  entry: {
    main: "./scripts/main.js",
    about: "./scripts/about.js",
    contact: "./scripts/contact.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    open: true,
    port: 3000,
    watchFiles: ["src/**/*.html"],
    liveReload: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: ["main"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "src/about.html",
      filename: "about.html",
      chunks: ["about"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "src/contact.html",
      filename: "contact.html",
      chunks: ["contact"],
      inject: "body",
    }),

    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
