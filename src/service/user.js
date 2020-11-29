/**
 * @description user service 数据处理层
 */

const {User} = require("../db/model/User");


/**
 * @description user service: 获取用户信息
 *
 */
const {formatUser} = require("./_format");

async function getUserInfos(userName, password) {
    //查询条件
    let whereOpt = {
        userName
    }
    if(password) {
        Object.assign(whereOpt, {password});
    }

    //查询
    const result = await User.findOne({
        attributes: ["id", "userName", "nickName", "picture", "city"],
        whereOpt: whereOpt
    });

    if(!result) {
        return  result;
    }

    //格式化处理
    const formatRes = formatUser(result.dataValues);

    return formatRes;
}


module.exports = {
    getUserInfos
}
