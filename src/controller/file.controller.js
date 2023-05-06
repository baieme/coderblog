const {add,createPicture} = require('../service/file.service');
const {addAvatar} = require('../service/user.service');
class FileController {
    //头像上传
    async addAvatar(ctx,next){
        console.log(ctx.req.file);
        const {filename,mimetype,size}= ctx.req.file;
        const {id} = ctx.body;
        //将头像的信息存入到数据中
        const result = await add(id,filename,mimetype,size);

        //将头像信息添加到users表中
        // http://localhost:8080/user/9/avatar
        await addAvatar(id,`http://localhost:8080/user/${id}/avatar`);

        if(result){
            ctx.body = {
                message:'头像上传成功了',
                code:200
            }
        }
    }
    //上传图片
    async addPicture(ctx,next){
        const pictureArr = ctx.req.files;
        console.log(pictureArr)
        const {momentId} = ctx.query;
        const {id} = ctx.body;
        // console.log(pictureArr,momentId);
        //先遍历然后将图片添加到表中
        try {
            for(let item of pictureArr){
                await createPicture(id,item.filename,item.mimetype,item.size,momentId);
            }
            ctx.body = {
                message:'图片上传成功',
                code:200,
                pictureArr
            }
        } catch (error) {
            ctx.body = {
                message:'图片上传失败',
                code:400
            }
        }
        
    }
}

module.exports = new FileController();