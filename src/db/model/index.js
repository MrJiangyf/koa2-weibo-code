/**
 *  @description 数据模型入口文件
 */

const {User} = require("./User");
const {Blog} = require("./Blog");

Blog.belongsTo(User, {
    foreignKey: "userId"
})
User.hasMany(Blog, {
    // 创建外键 Blog.userId => User.id
    foreignKey: "userId"
})

module.exports = {
    User,
    Blog,
}
