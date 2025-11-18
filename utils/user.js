import Settings from "../data/settings";
import Fingerprint2 from "fingerprintjs2";
import axios from "axios";
import { getCdnLink } from "./common";
const { tokenExpires, tokenKey } = Settings;

class User {
    static TOKEN_KEY = tokenKey;
    static LAST_AUTH = "created_at";
    static KEY_FIELDS = ["uid", "group", "token", "name", "avatar", "logged_in", User.LAST_AUTH, tokenKey];
    static LOCALE = "lang";
    constructor() {
        this.profile = {};

        this.anonymous = {
            uid: 0,
            group: 1,
            token: "",

            name: "匿名用户",
            avatar: "",
        };
        // token有效期30天
        this.expires = tokenExpires;
        this.created_at = 0;

        // 登录状态
        this.logged_in = false;
    }

    // 检查当前状态
    check() {
        if (this.isLogin()) {
            this.profile.uid = localStorage && localStorage.getItem("uid");
            this.profile.group = (localStorage && localStorage.getItem("group")) || 1;
            this.profile.token = localStorage && localStorage.getItem(User.TOKEN_KEY);
            this.profile.name = localStorage && localStorage.getItem("name");
            this.profile.avatar = localStorage && localStorage.getItem("avatar");
        } else {
            this.profile = this.anonymous;
        }
        return this;
    }

    /**
     * 更新用户信息
     * @param {Object} data 用户信息
     * @memberof User
     */
    update(data) {
        return new Promise((resolve, reject) => {
            try {
                this._save(data);
                resolve(data);
            } catch (error) {
                //如果localStorage不存在或已满
                if (localStorage) {
                    localStorage.clear();
                    this._save(data);
                    resolve(this);
                } else {
                    reject(new Error("localStorage不可用"));
                }
            }
        });
    }

    /**
     * 保存用户信息到本地
     * @param {Object} data 用户信息
     * @memberof User
     */
    _save(data) {
        this.profile = data;
        data.token && localStorage.setItem(User.TOKEN_KEY, data.token);
        localStorage.setItem(User.LAST_AUTH, Date.now());
        localStorage.setItem("logged_in", true);

        localStorage.setItem("uid", data.id);
        localStorage.setItem("group", data.group);

        localStorage.setItem("name", data.nickname);
        localStorage.setItem("avatar", data.avatar);
    }

    /**
     * 注销
     * @memberof User
     */
    logout() {
        for (let key of User.KEY_FIELDS) {
            localStorage.removeItem(key);
        }
        sessionStorage.clear();
    }

    /**
     * 获取令牌
     * @returns {String} 令牌
     * @memberof User
     */
    getToken() {
        return localStorage.getItem(User.TOKEN_KEY);
    }

    // 获取用户基础缓存信息
    getInfo() {
        this.check();
        return this.profile;
    }

    /**
     * 是否已登录
     * @returns {Boolean} 是否已登录
     * @memberof User
     */
    isLogin() {
        this.created_at = !localStorage.getItem(User.LAST_AUTH) ? -Infinity : localStorage.getItem(User.LAST_AUTH);
        this.logged_in = localStorage.getItem("logged_in") == "true" ? true : false;
        return this.logged_in && Date.now() - this.created_at < this.expires;
    }

    /**
     * 前往登录
     * @param {String} redirect 登录后跳转的地址
     * @memberof User
     */
    toLogin(redirect) {
        redirect = redirect ? encodeURIComponent(redirect) : encodeURIComponent(location.href);
        location.href = "/?redirect=" + redirect;
    }

    /**
     * 更新指定缓存字段
     *
     * @param {String} key 缓存字段
     * @param {String} value 缓存值
     * @returns {*}
     * @memberof User
     */
    updateCache(key, value) {
        localStorage.setItem(key, value);
        this.profile[key] = value;
    }

    // 判断是否为普通成员
    isEditor() {
        return this.getInfo().group >= 64;
    }

    // 判断是否为管理员
    isAdmin() {
        return this.getInfo().group >= 128;
    }

    // 判断是否为超管
    isSuperAdmin() {
        return this.getInfo().group >= 512;
    }

    // 获取我的group
    getGroup() {
        return this.getInfo().group;
    }

    // 获取我的权限
    getPermission() {
        return localStorage.getItem("permission") || [];
    }

    /**
     * 设置语言偏好
     *
     * @param {*} locale
     * @return {*}
     * @memberof User
     */
    setLocale(locale) {
        return localStorage.setItem(User.LOCALE, locale);
    }

    /**
     * 获取语言偏好设置
     *
     * @return {*}
     * @memberof User
     */
    getLocale() {
        const _val = localStorage.getItem(User.LOCALE);
        if (!_val) {
            return navigator.language;
        } else {
            return _val;
        }
    }

    // 生成设备指纹
    generateFingerprint(callback) {
        const cache = localStorage.getItem("fingerprint");
        if (cache && cache.length == 32) {
            return cache;
        }
        Fingerprint2.get(function (components) {
            const values = components.map((component) => component.value);
            const murmur = Fingerprint2.x64hash128(values.join(""), 31);

            localStorage.setItem("fingerprint", murmur);
            callback && callback(murmur);
        });
    }

    // 获取设备指纹
    getDeviceFingerprint() {
        return localStorage.getItem("fingerprint");
    }

    /**
     * 版本预检
     * @param {string} version
     * @returns {boolean}
     * @memberof User
     */
    checkVersion(version) {
        try {
            const token_version = localStorage.getItem("token_version");

            if (token_version == version) {
                console.log("版本预检通过");
                localStorage.setItem("token_version", version);
                return true;
            } else {
                console.log("版本预检失败，清空缓存");
                localStorage.clear();
                localStorage.setItem("token_version", version);

                this.toLogin();

                return false;
            }
        } catch (err) {
            this.toLogin();
            return false;
        }
    }

    /**
     * 加载默认配置
     */
    getDefaultConf() {
        return axios.get(`${getCdnLink("/common/system/conf/miipet_default.json")}`).then((res) => {
            sessionStorage.setItem("miipet_default_conf", JSON.stringify(res.data));

            return this.checkVersion(res.data.token_version);
        });
    }
}

export { User };

export default new User();
