/**
 * Vue 代理插件：自动生成域名前缀代理配置
 * 用于将 /abc.2kog.com/* 请求代理到 https://abc.2kog.com/*
 */

class VueProxyPlugin {
    constructor(options = {}) {
        this.options = {
            domains: [], // 要代理的域名列表，如 ['abc', 'dev.def']
            customProxy: {}, // 自定义代理配置
            ...options
        };
    }

    // 内置的常用域名列表
    static get BUILTIN_DOMAINS() {
        return ["pay", "dev.pay"];
    }

    // 静态方法：直接生成配置对象，用于 vue.config.js
    static generateProxy(domains = [], customProxy = {}) {
        const proxyConfig = {};

        // 合并内置域名和用户自定义域名
        const allDomains = [...VueProxyPlugin.BUILTIN_DOMAINS, ...domains];

        // 去重
        const uniqueDomains = [...new Set(allDomains)];

        uniqueDomains.forEach(domain => {
            const targetUrl = `https://${domain}.2kog.com`;

            proxyConfig[`/${domain}.2kog.com`] = {
                target: targetUrl,
                changeOrigin: true,
                pathRewrite: {
                    [`^/${domain}.2kog.com`]: ''
                },
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            };
        });

        return Object.assign({}, proxyConfig, customProxy);
    }

    // 静态方法：仅使用内置域名生成代理配置
    static generateBuiltinProxy(customProxy = {}) {
        return VueProxyPlugin.generateProxy([], customProxy);
    }

    // 静态方法：获取内置域名列表
    static getBuiltinDomains() {
        return [...VueProxyPlugin.BUILTIN_DOMAINS];
    }
}

module.exports = VueProxyPlugin;
