/*
 * @Author: iRuxu
 * @Date: 2022-06-16 18:32:38
 * @LastEditTime: 2022-07-13 18:27:30
 * @Description: 通用请求器
 */

import { installStandardInterceptors } from "./interceptors.js";
import axios from "axios";
import User from "./user.js";

// cms通用请求接口
function $uc(options) {
    let domain = (options && options.domain) || process.env.VUE_APP_UC_API;
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + User.getToken(),
            "user-device-fingerprint": User.getDeviceFingerprint(),
        },
        baseURL: domain,
    };

    if (options && options.progress) {
        config.onUploadProgress = options.progress;
    }

    // 创建实例
    const ins = axios.create(config);

    // 指定拦截器
    installStandardInterceptors(ins, options);

    return ins;
}

export { $uc };
