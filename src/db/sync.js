const seq = require("./seq");

//调用user、blog创建相应的表
require("./model/index");

//测试连接
seq.authenticate().then(() => {
    console.log("ok")
}).catch(() => {
    console.log("err");
})

//执行同步
//force：true表示当数据库有相应的数据模型（表），如：users的时候会无条件将users表删除
seq.sync({force: true}).then(() => {
    console.log("sync ok");
    process.exit();
})
