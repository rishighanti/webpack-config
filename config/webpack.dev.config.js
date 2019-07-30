const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        app: './public/assets/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../../build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 1000 * 1024,
                            noquotes: true,
                        },
                    }
                ],
            }

        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        historyApiFallback: true,
        compress: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/main.html',
            appMountId: 'app',
            title: 'PhotoGallery'
        })
    ],
    devtool: "cheap-source-map",
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0
        }
    }
}
module.exports = config;
