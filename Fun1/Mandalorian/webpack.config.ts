import path from 'path'
import { Configuration, DllReferencePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export const buildDir = path.resolve(__dirname, "dist", "build");

export default (env: any): Configuration => {
    return {
        entry: './src/Game.ts',
        devtool: 'inline-source-map',
        stats: {
            modules: false,
            warnings: false,
            children: false            
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', 'js'],
        },
        plugins: [
            new DllReferencePlugin({
                context: __dirname,
                manifest: path.join(buildDir , 'vendor-manifest.json')
            }),
            // new BundleAnalyzerPlugin()
        ],
        output: {
            filename: 'game.bundle.js',
            path: buildDir ,
        },
    }
}
