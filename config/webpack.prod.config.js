const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {
    mode: 'production',
    entry: {
        app: './public/assets/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
                    'sass-loader']
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
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
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/main.html',
            appMountId: 'app',
            title: 'PhotoGallery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),

    ],
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
