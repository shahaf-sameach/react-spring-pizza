var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : false,
    entry: "./js/index.js",
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname),
        compress: true,
        hot: true,
        port: 9000,
        // proxy: {
        //     '/api': 'http://localhost:8080',
        //     changeOrigin: true,
        //     context: () => true
        // }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "index.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};