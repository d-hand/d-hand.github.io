import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import { Configuration, DllPlugin } from "webpack";
// import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

import {buildDir} from "./webpack.config";

export default (env: any): Configuration => {
    return {
        entry: {
            vendor2: [
                "phaser",
            ]
        },
        output: {
            path: buildDir,
            filename: "[name].bundle.js",
            library: "[name]"
        },
        devtool: "source-map",
        optimization: {
            // minimizer: [
            //     new TerserPlugin({
            //         terserOptions: {
            //             sourceMap: true
            //         }
            //     })
            // ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new DllPlugin({
                name: '[name]',
                path: path.join(buildDir, 'vendor-manifest.json'),
            }),
            // new BundleAnalyzerPlugin()
        ],
        stats: "errors-only"
    };
};
