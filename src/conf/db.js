/**
 * @description 存储配置
 * @type {{port: number, host: string}}
 */

// const {isPort} = require("");

let REDIS_CONF = {
    port: 6379,
    // host: "111.231.145.124",
    host: "localhost"
}

let MYSQL_CONF = {
    host: "111.231.145.124",
    user: "root",
    password: "Zlh@1234",
    port: "3306",
    database: "koa2_weibo_db"
}


module.exports = {
    REDIS_CONF,
    MYSQL_CONF,
}

