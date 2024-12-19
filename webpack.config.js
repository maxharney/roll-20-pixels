const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        popup: path.resolve(__dirname, "dist", "popup.js")
    },
    output: {
        clean: true
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