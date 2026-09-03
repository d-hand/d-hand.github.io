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
            }           
        ]
    },
    // для того чтобы резолвились абсолютные пути
    resolve: {
        modules: [
          path.resolve('./src'), 
          path.resolve('./node_modules')
        ]
    },    
    plugins: [
        new CopyWebpackPlugin([ { from: 'src/index.html', to: 'index.html' }] , {debug: 'info'})
    ]    
}