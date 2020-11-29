/**
 * @description 失败信息集合， 包含：msg， code
 */

module.exports = {
    //用户名不存在
    registerUserNameNotExistInfo: {
        code: 200,
        msg: "用户名可以使用"
    },
    //注册失败
    registerFailInfo: {
        code: 500,
        msg: "注册失败，请重试"
    },
    //注册：用户名已经存在
    registerUserNameExistInfos: {
        code: 500,
        msg: "注册失败，用户名已经存在"
    }
}
