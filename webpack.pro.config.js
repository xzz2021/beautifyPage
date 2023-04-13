// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


//----------此插件可以清除注释,console,debugger以及指定不需要的内容--------
const TerserWebpackPlugin = require('terser-webpack-plugin')



const proconfig = {
    mode: 'production',
    optimization: {  // 优化配置项  实现前提是 ES Modules-------------需修改babel-loader---------
    //     concatenateModules: true,    // 尽可能合并每一个模块到一个函数中  减少体积和运行效率
        minimizer: [   //  把未引用的块剔除掉     压缩
        new TerserWebpackPlugin({//--------------详细配置----------https://github.com/terser/terser
            extractComments: false,      //  不生成LICENSE文件(提取注释)
            // minify: TerserWebpackPlugin.uglifyJsMinify,   //集 JavaScript 解析器，压缩器，美化器于一身
            terserOptions: {
                // minify: {

                // },
                format: {
                  comments: false,//删除所有注释
                //   ecma: 6,   //期待输出的es版本

                },
                compress: {
                  drop_console: true, // 移除所有console.log
                },
              },
        }),
        ]     
    },
    //------此处定义可以结合merge整合,避免相同键覆写-------
    plugins: [
        new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件
        new CopyWebpackPlugin({  //实现静态文件的直接复制
            patterns: [             // 需要拷贝的目录或者路径
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifestPro.json', to: './manifest.json'}
        ]}),

        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
        //可以定义全局上下文的变量
        new webpack.DefinePlugin({
            // 此处解决vue未定义extension大量报错问题
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            "AUTHOR": JSON.stringify('user'),
            "VERSION": JSON.stringify('0928'),
            'DEBUG': false
          }),

    ],
    module: {  
        rules: [
            {
                oneOf:[
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                    }
                ]
            },
        ],
    },
    // externals: {}, //在生产模式引入指定模块外链cdn的情况下,忽略指定的模块不进行打包

}

module.exports = proconfig
