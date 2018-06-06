const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader'],                
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([ { from: 'src/index.html', to: 'index.html' }] , {debug: 'info'})
    ]    
}