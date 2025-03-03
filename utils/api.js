/*
 * @Author: iRuxu
 * @Date: 2022-06-16 18:32:38
 * @LastEditTime: 2022-07-13 18:27:30
 * @Description: 通用请求器
 */

import { installStandardInterceptors } from "./interceptors.js";
import axios from "axios";
import User from "./user.js";
import GlobalConfig from "../data/global.json";

// uc通用请求接口
function $uc(options = {}, axiosConfig = {}) {
  // 解构options并设置默认值
  const { interceptor = true, domain, region, progress } = options;

  // 获取请求域名
  let requestDomain = "";
  if (domain) {
    requestDomain = domain;
  } else if (region) {
    requestDomain = `https://uc.${region}.${GlobalConfig.__domain}`;
  } else {
    requestDomain =
      process.env.VUE_APP_UC_API || process.env.VUE_APP_COMMON_API;
  }

  // 设置请求头
  let config = {
    // 同时发送cookie和basic auth
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + User.getToken(),
      "user-device-fingerprint": User.getDeviceFingerprint(),
    },
    baseURL: requestDomain + "/api/uc",
  };

  // 设置进度条
  if (progress) {
    config.onUploadProgress = progress;
  }

  // 创建实例
  const ins = axios.create(Object.assign(axiosConfig, config));

  // 指定拦截器
  if (interceptor) {
    installStandardInterceptors(ins, options);
  }

  return ins;
}

// cms通用请求接口
function $cms(options = {}, axiosConfig = {}) {
  // 解构options并设置默认值
  const { interceptor = true, domain, region, progress } = options;

  // 获取请求域名
  let requestDomain = "";
  if (domain) {
    requestDomain = domain;
  } else if (region) {
    requestDomain = "https://cms." + region + GlobalConfig.__domain;
  } else {
    requestDomain =
      process.env.VUE_APP_CMS_API || process.env.VUE_APP_COMMON_API;
  }

  // 设置请求头
  let config = {
    // 同时发送cookie和basic auth
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + User.getToken(),
    },
    baseURL: requestDomain + "/api/cms",
  };

  // 设置进度条
  if (progress) {
    config.onUploadProgress = progress;
  }

  // 创建实例
  const ins = axios.create(Object.assign(axiosConfig, config));

  // 指定拦截器
  if (interceptor) {
    installStandardInterceptors(ins, options);
  }

  return ins;
}

// os通用请求接口
function $os(options = {}, axiosConfig = {}) {
  // 解构options并设置默认值
  const { interceptor = true, domain, region, progress } = options;
  // 获取请求域名
  let requestDomain = "";
  if (domain) {
    requestDomain = domain;
  } else if (region) {
    requestDomain = "https://os." + region + GlobalConfig.__domain;
  } else {
    requestDomain =
      process.env.VUE_APP_OS_API || process.env.VUE_APP_COMMON_API;
  }

  // 设置请求头
  let config = {
    // 同时发送cookie和basic auth
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + User.getToken(),
    },
    baseURL: requestDomain + "/api/os",
  };

  // 设置进度条
  if (progress) {
    config.onUploadProgress = progress;
  }

  // 创建实例
  const ins = axios.create(Object.assign(axiosConfig, config));

  // 指定拦截器
  if (interceptor) {
    installStandardInterceptors(ins, options);
  }

  return ins;
}

// pay通用请求接口
function $pay(options = {}, axiosConfig = {}) {
  // 解构options并设置默认值
  const { interceptor = true, domain, region, progress } = options;
  // 获取请求域名
  let requestDomain = "";
  if (domain) {
    requestDomain = domain;
  } else if (region) {
    requestDomain = "https://pay." + region + GlobalConfig.__domain;
  } else {
    requestDomain =
      process.env.VUE_APP_PAY_API || process.env.VUE_APP_COMMON_API;
  }

  // 设置请求头
  let config = {
    // 同时发送cookie和basic auth
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + User.getToken(),
    },
    baseURL: requestDomain + "/api/pay",
  };

  // 设置进度条
  if (progress) {
    config.onUploadProgress = progress;
  }

  // 创建实例
  const ins = axios.create(Object.assign(axiosConfig, config));

  // 指定拦截器
  if (interceptor) {
    installStandardInterceptors(ins, options);
  }

  return ins;
}

export { $uc, $cms, $os, $pay };
