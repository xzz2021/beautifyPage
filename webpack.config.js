// Generated using webpack-cli https://github.com/webpack/webpack-cli
const proconfig = require('./webpack.pro.config.js')
const watchconfig = require('./webpack.watch.config.js')
const { merge } = require('webpack-merge')
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')


const comconfig = {
    entry: {
        background: './background.js',
        content: './content.js',
        inject: './inject.js',
        popup: './src/popup/pop.js'
    },
    output: {
        filename: (pathData) => {
            return pathData.chunk.name === 'background' ? './[name].js' : './js/[name].js';
          },
        path: path.resolve(__dirname, 'xzz2022'),
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: {
        orphanModules: true,
      },
    plugins: [
        new HtmlWebpackPlugin({    // 可以实现自动生成新的html并自动导入js
            template: './src/popup/pop.html', 
            filename: 'popup.html', 
            chunks: ['popup'],   
            inject: 'body',
        }), 
        new VueLoaderPlugin(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, 
                /\.vue$/, /\.vue\?vue/, 
              ],
              imports: [
                'vue',
              ],
          }),
        Components({ 
            dirs:['src'],
            directoryAsNamespace: true,
            globalNamespaces: ['components', 'pages'],
            // allowOverrides: true,
            // include: [/src/],
            exclude: [/[\/]app.vue[\/]/],
            // exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
        }),
        new webpack.ProvidePlugin({  // 在函数上下文环境中注入第三方库---缺点:无法全局window引用---使用expose-loader解决
        $: 'jquery',
        // jq: 'jquery',
        // _: 'lodash'
        }),
    ],
    module: {  
        rules: [
            {
                oneOf:[
                    {
                        test: /\.(js|jsx)$/i,
                        loader: 'babel-loader', //调用babelcore把源代码转换成抽象语法树,解析遍历生成,
                        exclude: /node_modules/, 
                        options: {
                            cacheDirectory: true,
                        }
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, 
                        type: 'asset/inline',
                        // use: 'url-loader?limit=16941'
                    }
                ]
            },
            {
                test: /.vue$/,
                use: 'vue-loader'
            },
            // 解决引入element-plus打包报错问题
            {
                test: /\.(t|j|mj)s$/,
                include: path.resolve(
                    __dirname,
                    '../node_modules/element-plus'
                ),
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
};


module.exports = (env,args) => {
    if (env.WEBPACK_WATCH) {
        return merge(comconfig, watchconfig)
    }else{
        return merge(comconfig, proconfig)
    }
}

