const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        popup: path.resolve(__dirname, "src", "popup.ts")
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "src", "manifest.json"), 
                    to: path.resolve(__dirname, "dist", "manifest.json"), 
                },
            ],
        }),
    ]
};