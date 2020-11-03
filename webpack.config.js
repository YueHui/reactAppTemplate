const path = require('path');
//build前清除dist下的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//生成build后的html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'eval-cheap-module-source-map',
	devServer:{
		contentBase:false,
		port:'8000',
		hot:true,
		watchOptions: {
            ignored: /node_modules/,
            poll: false,
        },
        stats: {
            assets: false,
            modules: false,
            entrypoints: true,
            children: false,
        }
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject:true
		}),
		new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: true,
        })
		// new UglifyJSPlugin()
	],
	resolve: {
        alias: {
            "@": path.join(__dirname,"./src"),
        }
    },
	module: {
		rules: [
			{
				test: /\.css$/i,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				include: __dirname+'/src',
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader", 
					"less-loader"
				]
			}
		]
	},
	performance: {
        hints: "warning",
        maxEntrypointSize: 5000000, 
        maxAssetSize: 3000000
    }
};