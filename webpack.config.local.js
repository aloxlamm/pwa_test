const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/app.js',
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
        port: 8080,
        index: 'public/index.html'
    },
    devtool: 'eval',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(),
        /*         new MiniCssExtractPlugin({
                    filename: 'main.css',
                    chunkFilename: '[id].css',
                }), */
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname, 'src/images'),
                to: 'images'
            },
            {
                from: path.resolve(__dirname, 'src/static-data'),
                to: 'static-data'
            },
            {
                from: path.resolve(__dirname, 'src/_config'),
                to: '_config'
            }
        ])
    ]
}