/*
 * @Date: 2023-03-27 11:36:17
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-13 16:11:54
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const {wsAutoReloadPlugin} = require('ws-reload-plugin')
const webpack = require('webpack')

const watchconfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
      new wsAutoReloadPlugin(),
      new CopyWebpackPlugin({
            patterns: [
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifest.json', to: './manifest.json'}
        ]}),
        //可以定义全局上下文的变量
      new webpack.DefinePlugin({
          // 此处解决vue未定义extension大量报错问题
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ : false,
          "AUTHOR": JSON.stringify('xzz2022'),
          'DEBUG': true
        })
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {  
      rules: [
          {
              oneOf:[
                  {
                      test: /\.css$/i,
                      use: ["style-loader", 'css-loader'],  
                  },
                  {
                      test: /\.s[ac]ss$/i,
                      use: ["style-loader", 'css-loader','sass-loader'],
                  }
              ]
          },
      ],
  },
};

module.exports = watchconfig