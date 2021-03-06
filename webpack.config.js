module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: __dirname + "/public/dist/",
    filename: "main.js",
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: "public/",
    hot: false
  }
};
