const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        popup: path.resolve(__dirname, "src", "popup", "index.ts")
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
                { 
                    from: path.resolve(__dirname, "src", "popup", "index.html"), 
                    to: path.resolve(__dirname, "dist", "popup.html"), 
                },
            ],
        }),
    ]
};