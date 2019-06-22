const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const paths = {
    PUBLIC: path.resolve(__dirname, 'public'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
};


module.exports = {
    mode: 'production',
    entry: {
        app: path.join(paths.JS, 'App.js')
    },
    output: {
        path: paths.PUBLIC,
        filename: 'js/App.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: paths.PUBLIC,
        port: 8080
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /node_modules\/lit-html/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    optimization: {
        // minifier
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
            chunkFilename: 'css/[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/images',
                to: 'images'
            },
            {
                from: 'src/static-data',
                to: 'static-data'
            },
            {
                from: 'src/fonts',
                to: 'fonts'
            },
            {
                from: 'src/plugins',
                to: 'plugins'
            },
            {
                from: path.resolve(__dirname, 'src/_config'),
                to: '_config'
            },
            {
                from: path.resolve(__dirname, 'src/_config.prod'),
                to: '_config'
            }
        ])
    ]
}