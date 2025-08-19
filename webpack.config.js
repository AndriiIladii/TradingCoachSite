const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isVercel = !!process.env.VERCEL;

module.exports = {
  entry: {
    main: "./src/scripts/main.js",
    about: "./src/scripts/about.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    assetModuleFilename: "assets/[name][hash][ext][query]",
    clean: true,
    publicPath: isVercel ? "/" : isDev ? "/" : "./",
  },

  devtool: isDev ? "eval-source-map" : false,

  devServer: {
    static: { directory: path.join(__dirname, "dist") },
    hot: true,
    open: true,
    port: 3000,
    watchFiles: ["src/**/*"],
    liveReload: true,
    historyApiFallback: false, // у нас MPA, не SPA
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } },
          { loader: "sass-loader", options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name][hash][ext][query]" },
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name][hash][ext][query]" },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      chunks: ["main"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about.html",
      filename: "about.html",
      chunks: ["about"],
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "styles.css" : "styles.[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "favicon", to: "" }],
    }),
  ],
};
