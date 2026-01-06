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

    // 内置的 API 前缀列表
    static get BUILTIN_API_PREFIXES() {
        return ["/api/manage", "/api/client"];
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

    // 静态方法：生成 API 代理配置
    static generateApiProxy(apiConfig = {}, customProxy = {}) {
        const proxyConfig = {};

        // 处理用户传入的 API 配置
        Object.entries(apiConfig).forEach(([prefix, config]) => {
            // 如果 config 是字符串，转换为对象
            const targetConfig = typeof config === 'string'
                ? { target: config }
                : config;

            proxyConfig[prefix] = {
                target: targetConfig.target,
                changeOrigin: targetConfig.changeOrigin !== undefined ? targetConfig.changeOrigin : true,
                secure: targetConfig.secure !== undefined ? targetConfig.secure : false,
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
                ...targetConfig
            };
        });

        return Object.assign({}, proxyConfig, customProxy);
    }

    // 静态方法：生成完整配置（域名 + API）
    static generateFullProxy(domains = [], apiConfig = {}, customProxy = {}) {
        const domainProxy = VueProxyPlugin.generateProxy(domains, {});
        const apiProxy = VueProxyPlugin.generateApiProxy(apiConfig, {});

        return Object.assign({}, domainProxy, apiProxy, customProxy);
    }

    // 静态方法：获取内置 API 前缀列表
    static getBuiltinApiPrefixes() {
        return [...VueProxyPlugin.BUILTIN_API_PREFIXES];
    }
}

/**
 * Vite 代理插件：自动生成域名前缀代理配置
 * 用于 vite.config.js 的 server.proxy 配置
 */
class ViteProxyPlugin {
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

    // 内置的 API 前缀列表
    static get BUILTIN_API_PREFIXES() {
        return ["/api/manage", "/api/client"];
    }

    // 静态方法：直接生成配置对象，用于 vite.config.js
    static generateProxy(domains = [], customProxy = {}) {
        const proxyConfig = {};

        // 合并内置域名和用户自定义域名
        const allDomains = [...ViteProxyPlugin.BUILTIN_DOMAINS, ...domains];

        // 去重
        const uniqueDomains = [...new Set(allDomains)];

        uniqueDomains.forEach(domain => {
            const targetUrl = `https://${domain}.2kog.com`;

            proxyConfig[`/${domain}.2kog.com`] = {
                target: targetUrl,
                changeOrigin: true,
                rewrite: (path) => path.replace(new RegExp(`^/${domain}.2kog.com`), ''),
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        proxyReq.setHeader('origin', '');
                    });
                }
            };
        });

        return Object.assign({}, proxyConfig, customProxy);
    }

    // 静态方法：仅使用内置域名生成代理配置
    static generateBuiltinProxy(customProxy = {}) {
        return ViteProxyPlugin.generateProxy([], customProxy);
    }

    // 静态方法：获取内置域名列表
    static getBuiltinDomains() {
        return [...ViteProxyPlugin.BUILTIN_DOMAINS];
    }

    // 静态方法：生成 API 代理配置
    static generateApiProxy(apiConfig = {}, customProxy = {}) {
        const proxyConfig = {};

        // 处理用户传入的 API 配置
        Object.entries(apiConfig).forEach(([prefix, config]) => {
            // 如果 config 是字符串，转换为对象
            const targetConfig = typeof config === 'string'
                ? { target: config }
                : config;

            proxyConfig[prefix] = {
                target: targetConfig.target,
                changeOrigin: targetConfig.changeOrigin !== undefined ? targetConfig.changeOrigin : true,
                secure: targetConfig.secure !== undefined ? targetConfig.secure : false,
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        proxyReq.setHeader('origin', '');
                    });
                },
                ...targetConfig
            };
        });

        return Object.assign({}, proxyConfig, customProxy);
    }

    // 静态方法：生成完整配置（域名 + API）
    static generateFullProxy(domains = [], apiConfig = {}, customProxy = {}) {
        const domainProxy = ViteProxyPlugin.generateProxy(domains, {});
        const apiProxy = ViteProxyPlugin.generateApiProxy(apiConfig, {});

        return Object.assign({}, domainProxy, apiProxy, customProxy);
    }

    // 静态方法：获取内置 API 前缀列表
    static getBuiltinApiPrefixes() {
        return [...ViteProxyPlugin.BUILTIN_API_PREFIXES];
    }
}

module.exports = {VueProxyPlugin, ViteProxyPlugin};
