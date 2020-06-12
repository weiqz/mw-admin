const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

	},
	devServer: {
		host: '0.0.0.0' // 将此处localhost 修改为  '0.0.0.0'
	},
	productionSourceMap:false

}

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, './src/style/main.less'), // 需要全局导入的less
			],
		})
}