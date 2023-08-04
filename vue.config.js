const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: './',
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.(tsx?|jsx?)$/i,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-react'],
								plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-react-jsx'],
							},
						},
					],
				},
			],
		},
	},
})
