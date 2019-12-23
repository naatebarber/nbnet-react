const webpack = require("webpack"),
    contentful = require("contentful"),
    get_assets = require("./get.assets.dev");

var ctf = contentful.createClient({
    space: "egac4knf7iqn",
    accessToken: "3c84dff7474ac76b2007318be8a7bbed90d16ebb405ace8e1c4e288a082e1a25"
});

module.exports = {
    entry: "./src/App.jsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: "./dist",
        before: function(app, server) {
            app.get("/cms", (req, res) => {
                get_assets(ctf, req, res);
            });
        }
    }
}