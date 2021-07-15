const path = require("path");
// vue.config.js导出的配置项
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    // 项目部署路径
    publicPath: "/",
    /**
     * 定制iview 主题 配置 less-loader
     * 具体可查看 https://github.com/iview/iview/issues/4156
     * 根据 vue-cli 3.0 文档 css  loader 相关推荐使用这种配置方式,
     */
    css: {
        // 配置css模块
        loaderOptions: {
            // 向预处理器 Loader 传递配置选项
            less: {
                // 配置less（其他样式解析用法一致）
                javascriptEnabled: true // 设置为true
            }
        }
    },
    chainWebpack: config => {
        // 添加 iview-loader
        // config.module
        //   .rule("vue")
        //   .use("iview-loader")
        //   .loader("iview-loader")
        //   // 配置所有 iView 组件标签名可以使用前缀 i-
        //   .tap(options => Object.assign({}, options, { prefix: true }))
        //   .end();
        // 配置svg
        const svgRule = config.module.rule('svg')
            // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
            // 添加要替换的 loader
        svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            // 添加路径别名
        config.resolve.alias
            // 公共组件路径
            .set("_components", resolve("src/components"))
            // 模块路径
            .set("_utils", resolve("src/utils"))
            // 公共配置
            .set("_public", resolve("public"))
            // 全局资源
            .set("_assets", resolve("src/assets"));
    },
    lintOnSave: true,
    // 是否生成sourcemap文件，生成环境不生成以加速生产环境构建
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8088,
        proxy: {
            '/maps': {
                target: 'https://webapi.amap.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/adminapi': '/maps'
                }
            }
        },
    },
    configureWebpack: {
        externals: {
            'AMap': 'AMap' // 高德地图配置
        }
    }
};