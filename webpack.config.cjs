const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    entry: "./build/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        fallback: {
            tls : false,
            crypto : false,
            fs : false,
            util : false,
            send : require.resolve('send/'),
            telegram : false,
            assert : false,
            http : false,
            path : false,
            net : false,
            os : false,
            stream : false,
            url : false,
            querystring : false,
            https : false,
            constants : false,
            zlib : false,
            async_hooks : false
        }
    },
}
