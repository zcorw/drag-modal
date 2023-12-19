const path = require("path");
module.exports = {
  entry: {
    dragModal: './index.js', // 入口文件路径
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件夹路径
    filename: '[name].mjs', // 输出文件名
    library: { type: 'module' }, // UMD 模块名称
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 JavaScript 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: 'babel-loader', // 使用 Babel 转译 ES6+
          options: {
            presets: ['@babel/preset-env'] // 使用 preset-env 预设
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 以字节为单位，这里是 8KB
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
              esModule: false, // 注意这里设置为 false，避免一些导出路径问题
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js'] // 支持导入不带扩展名的 .js 文件
  }
}