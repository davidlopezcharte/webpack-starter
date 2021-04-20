const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require ('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin') 
const CopyPlugin              = require ('copy-webpack-plugin');
const MinifyPlugin            = require ("babel-minify-webpack-plugin");
const TerserPlugin            = require('terser-webpack-plugin');
const { CleanWebpackPlugin }        = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
 
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin() ],
        minimize: true,
        minimizer: [new TerserPlugin()],
        //minimizer: [new OptimizeCssAssetsPlugin() ],
        //minimize: true,
        //minimizer: [
        //    new TerserPlugin(),
        //  ],
    },
    output: {
        filename: 'main.[contenthash].js',
        
        path: path.resolve(__dirname, 'dist'),
        
    },

    module:
     {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                     "babel-loader"
                ]
                
            },

            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

            
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]

            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin ({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/'},
            ],
          }),
       
          new MinifyPlugin(),
          new CleanWebpackPlugin(),
          
                  
    ]
 
    
}
 