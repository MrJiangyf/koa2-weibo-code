/**
 * @description 微博
 */
const {Blog} = require("../db/model/Blog");

async function createBlog({content, image, userId}) {
     const result = await Blog.create({
         userId,
         content,
         image
     })
    return result.dataValues;
}


module.exports = {
    createBlog
}
