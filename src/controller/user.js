/**
 * @description user controller：1.处理业务逻辑，2.调用service处理好的数据，3.返回格式统一化
 */

const {getUserInfos, createUser} = require("../service/user");
const {SuccessModel, ErrorModel} = require("../model/ResModel");
const {doCrypto} = require("../utils/cryp");

const {registerUserNameNotExistInfo, registerUserNameExistInfos, registerFailInfo} = require("../model/ErrorInfos");
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

/**
 * 注册
 * @param username
 * @param password
 * @param gender
 * @returns {Promise<*>}
 */
async function register({userName, password, gender}) {
    const userInfo = await getUserInfos(userName);
    //先对用户名校验是否存在
    if(userInfo) {
        return new ErrorModel(registerUserNameExistInfos);
    }

    //注册 service
    try {
        let result = createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel({
            msg: "注册成功",
            data: ""
        })
    } catch (e) {
        return  new ErrorModel(registerFailInfo);
    }

}

module.exports = {
    isExist,
    register
}
