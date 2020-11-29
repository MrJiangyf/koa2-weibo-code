/**
 * @description user controller：1.处理业务逻辑，2.调用service处理好的数据，3.返回格式统一化
 */

const {getUserInfos} = require("../service/user");
const {SuccessModel, ErrorModel} = require("../model/ResModel");

const {registerUserNameNotExistInfo} = require("../model/ErrorInfos");
/**
 * @description 用户名是否存在
 */
async function isExist(userName) {
    const userInfos = await getUserInfos(userName);
    if(userInfos) {
        // {code: 500, data: uerInfos, msg: "用户名已存在"}
        return new ErrorModel({
            userInfos,
            ...registerUserNameNotExistInfo
        })
    }else {
        // {code: 200, data: userInfos, msg: "用户名不存在"}
        return  new SuccessModel({
            userInfos,
            msg: "用户名不存在"
        })
    }
}

module.exports = {
    isExist
}
