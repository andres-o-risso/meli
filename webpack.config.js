'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        meli: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'assets/[hash]-[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            minimize: true,
                            localIdentName: '[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ]),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src', 'assets'),
                to: 'assets'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id]_[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Mercado Libre',
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ],
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src', 'assets'),
            components: path.resolve(__dirname, 'src', 'components'),
            store: path.resolve(__dirname, 'src', 'store')
        },
        extensions: ['.js', '.json', '.jsx']
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    devtool: 'eval-source-map'
};
