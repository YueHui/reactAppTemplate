const path = require('path');
//build前清除dist下的文件
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
//生成build后的html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const {ProvidePlugin} = webpack;

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: '8000',
		hot: true,
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
		new ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			ignoreOrder: true,
		})
		// new UglifyJSPlugin()
	],
	resolve: {
		alias: {
			"@": path.join(__dirname, "./src"),
		},
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    {
										useBuiltIns: "usage",
                                        modules: "commonjs",
                                        targets:{
                                            "chrome":60
                                        }
                                    },
                                    
                                ]
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime'
                            ]
                        },
                    }
                ]
            },{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				include: __dirname + '/src',
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