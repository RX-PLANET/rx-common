/*
 * @Author: iRuxu
 * @Date: 2022-06-16 18:32:38
 * @LastEditTime: 2022-07-13 18:27:30
 * @Description: 通用请求器
 */

import { installStandardInterceptors } from "./interceptors.js";
import axios from "axios";
import User from "./user.js";
import GlobalConfig from '../data/global.json'

// uc通用请求接口
function $uc(options = { interceptor: true }, axiosConfig = {}) {

    // 获取请求域名
    let domain = ""
    if (options.domain) {
        domain = options.domain
    } else if (options.region) {
        domain = `https://uc.${options.region}.${GlobalConfig.__domain}`
    } else {
        domain = process.env.VUE_APP_UC_API || process.env.VUE_APP_COMMON_API;
    }

    // 设置请求头
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + User.getToken(),
            "user-device-fingerprint": User.getDeviceFingerprint(),
        },
        baseURL: domain,
    };

    // 设置进度条
    if (options.progress) {
        config.onUploadProgress = options.progress;
    }

    // 创建实例
    const ins = axios.create(Object.assign(axiosConfig, config));

    // 指定拦截器
    if (options.interceptor) {
        installStandardInterceptors(ins, options);
    }

    return ins;
}

// cms通用请求接口
function $cms(options = { interceptor: true }, axiosConfig = {}) {

    // 获取请求域名
    let domain = ""
    if (options.domain) {
        domain = options.domain
    } else if (options.region) {
        domain = "https://cms." + options.region + GlobalConfig.__domain
    } else {
        domain = process.env.VUE_APP_CMS_API || process.env.VUE_APP_COMMON_API;
    }

    // 设置请求头
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + User.getToken(),
        },
        baseURL: domain,
    };

    // 设置进度条
    if (options.progress) {
        config.onUploadProgress = options.progress;
    }

    // 创建实例
    const ins = axios.create(Object.assign(axiosConfig, config));

    // 指定拦截器
    if (options.interceptor) {
        installStandardInterceptors(ins, options);
    }

    return ins;
}

// os通用请求接口
function $os(options = { interceptor: true }, axiosConfig = {}) {

    // 获取请求域名
    let domain = ""
    if (options.domain) {
        domain = options.domain
    } else if (options.region) {
        domain = "https://os." + options.region + GlobalConfig.__domain
    } else {
        domain = process.env.VUE_APP_OS_API || process.env.VUE_APP_COMMON_API;
    }

    // 设置请求头
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + User.getToken(),
        },
        baseURL: domain,
    };

    // 设置进度条
    if (options.progress) {
        config.onUploadProgress = options.progress;
    }

    // 创建实例
    const ins = axios.create(Object.assign(axiosConfig, config));

    // 指定拦截器
    if (options.interceptor) {
        installStandardInterceptors(ins, options);
    }

    return ins;
}

export { $uc, $cms, $os };
