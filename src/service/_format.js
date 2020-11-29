/**
 * @description 数据格式化
 */
const {DEFAULT_PICTURE} = require("../conf/constant");


/**
 * @description 处理用户头像为空的情况
 * @param obj
 * @returns {*}
 * @private
 */
function _formatUserPicture(obj) {
    if (!obj) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj;
}

/**
 * @description 处理用户列表数据头像为空的情况
 * @param list
 * @returns {*[]|*}
 */
function formatUser(list) {
    if (!list) {
        return list
    }

    //数组 用户列表
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    //单个对象
    return _formatUserPicture(list);
}

module.exports = {
    _formatUserPicture,
    formatUser
}
