const webpack = require('webpack');
const path = require('path');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            PROJECT_ENV: JSON.stringify('release')
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|gif)$/,
                use: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    }
};
