const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin') // react热更新
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') //压缩css
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 显示编译进度条
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包文件体积分析
const ESLintPlugin = require('eslint-webpack-plugin')

const { tsConfigPath, htmlPath, dllFilePath, dllJsonPath, appSrc, appIndexJs } = require('./path')
module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'
  return {
    mode: webpackEnv,
    entry: appIndexJs,
    output: {
      filename: isEnvDevelopment ? 'js/[name].bundle.js' : 'js/[name].[contenthash:8].bundle.js',
      clean: true,
      chunkFilename: isEnvDevelopment ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: isEnvDevelopment ? 'asset/[name][ext][query]' : 'asset/[name].[contenthash:8][ext][query]',
      pathinfo: false
    },
    // 解析配置
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    // 排除不需要打包的模块
    externals: {},
    optimization: {
      runtimeChunk: 'single',
      minimizer: [new CssMinimizerPlugin(), '...']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic'
                    }
                  ],
                  '@babel/preset-typescript'
                ],
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      // 将es6转为es5时会有很多通用的函数被内联到文件中，
                      // 如：使用class 会有一个classCallCheck的函数，如果在多个文件中使用class，那么这个函数都会重复存在于这些文件中
                      // 将helpers设置true，则会将这些通用函数通过模块引用的方式来使用，减少了不必要的代码
                      helpers: true,
                      // corejs使用runtime-corejs来开启polyfill
                      corejs: 3,
                      // 使用generate时，会在全局环境上注入generate的实现函数，这样会造成全局污染
                      // regenerator为true，通过模块引入的方式来调用generate
                      regenerator: true
                    }
                  ],
                  isEnvDevelopment && 'react-refresh/babel' //开发模式热更新
                ].filter(Boolean),
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.less$/i, //匹配所有的 less 文件
          exclude: /node_modules/, // 取消匹配node_modules里面的文件
          use: [
            isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader', //style-loader的内部已经实现了HRM。
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: !isEnvProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009'
                        },
                        stage: 3
                      }
                    ],
                    isEnvProduction && [
                      '@fullhuman/postcss-purgecss', // 删除未使用的css
                      {
                        content: [htmlPath, ...glob.sync(path.join(appSrc, '/**/*.{tsx,ts,js,jsx}'), { nodir: true })]
                      }
                    ]
                  ].filter(Boolean)
                }
              }
            },
            'less-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          exclude: /node_modules/,
          type: 'asset',
          generator: {
            filename: 'image/[name].[contenthash:8][ext][query]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 50 * 1024 //超过50kb不转 base64
            }
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          type: 'asset',
          generator: {
            // 输出文件位置以及文件名
            filename: 'fonts/[name][hash:8][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 超过100kb不转 base64
            }
          }
        }
      ]
    },
    cache: {
      type: 'filesystem' // 使用文件缓存
    },
    plugins: [
      isEnvProduction && new webpack.DllReferencePlugin({ manifest: dllJsonPath }),
      isEnvProduction &&
        new AddAssetHtmlWebpackPlugin({
          filepath: path.resolve(__dirname, dllFilePath),
          publicPath: ''
        }),
      new HtmlWebpackPlugin({
        template: htmlPath
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css'
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        fix: true // 自动修复错误代码
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsConfigPath
        }
      }),
      isEnvProduction && new ProgressBarPlugin(),
      isEnvProduction && new BundleAnalyzerPlugin(),
      isEnvDevelopment && new ReactRefreshWebpackPlugin() //开发模式开启react热替换
    ].filter(Boolean)
  }
}
