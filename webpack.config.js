const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

// 都是在node环境下配置的,webpack是node环境
if (process.env.NODE_ENV === "production") {
    // 生产环境
    module.exports = {
        plugins: [new BundleAnalyzerPlugin()],
        externals: {
            devtool: "none",
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            axios: "axios"
        },
    }
}
else {
    // 开发环境
    module.exports = {}
}



