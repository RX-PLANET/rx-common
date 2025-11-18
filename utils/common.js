// 获取文档标题
import Setting from "../data/settings";

export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${Setting.Title}`;
    }
    return Setting.Title || "Admin";
}

/**
 * @description: 构建CDN链接
 *
 * @param {string} path 相对路径
 * @param {string|array|number} size
 * @return {string}
 */
export function getCdnLink(path, size) {
    if (path) {
        let url = `${Setting.__cdn}${path}`;
        return (url += buildOssSuffix(size));
    } else {
        return path;
    }
}

/**
 * @description: 构建oss图片后缀
 *
 * @param {string|array|number} size
 * @return {string}
 */
export function buildOssSuffix(size) {
    let suffix = "";
    if (size) {
        // 长宽不一致
        if (Array.isArray(size)) {
            suffix = `?x-oss-process=image/auto-orient,1/resize,m_fill,w_${size[0]},h_${size[1]}/quality,Q_100`;
            // 预设style
        } else if (isNaN(size)) {
            suffix = `?x-oss-process=style/${size}`;
            // 长宽一致
        } else {
            suffix = `?x-oss-process=image/auto-orient,1/resize,m_fill,w_${size},h_${size}/quality,Q_100`;
        }
    }
    return suffix;
}
