/**
 * json test
 */

const server = require("./server");

//测试 “/json” 接口返回数据是否符合预期
test("json 接口返回数据格式正确吗", async () => {

    //1.get请求
    const res = await server.get("/json");

    //2.post请求
    const res2 = await server.post("/json").send({username: "jiangyf", password: "123"});

    expect(res.body).toEqual({
        title: "koa2 json"
    })
    expect(res.body.title).toBe("koa2 json");
});

