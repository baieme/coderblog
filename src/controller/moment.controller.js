 const {createMoment,getMoment,getMomentList,updateMoment,removeMoment,addLabel,queryPictureMessage} = require('../service/moment.service.js');
 const fs = require('fs')
 class Moment {
    async createMoment(ctx,next){
        console.log(ctx.body);
        //  验证登录成功后，拿到userId 和 content 
        const {id} = ctx.body;
        const {content} = ctx.request.body;
     
        // ctx.body = '创建成功了'
        //插入到数据库中
        const result = await createMoment(content,id);
        
        if(result){
            ctx.body = {
                message:'插入成功',
                code:200,
            }
        }
    };
    //查询单挑评论
    async getMomentById(ctx,next){
        // 获得id
        const id = ctx.params.momentId;

        console.log(id)
        const result = await getMoment(id);
        ctx.body = result[0];
    }
    //查询多条评论
    async getMomentAll(ctx,next){
        // 获得偏移量和页数
        const {page,size} = ctx.query;
        console.log(page,size);
        const realPage = page*size+'';
        console.log(realPage)
        // const 
        const result = await getMomentList(realPage,size);
        ctx.body = result;
    }
    //进行评论的更改
    async update(ctx,next){
        const {momentId} = ctx.params;
        const {content} = ctx.request.body;

        //进行数据修改操作
  
        const result = await updateMoment(content,momentId);
        console.log(result);
        if(result){
            ctx.body = {
                message:'修改成功了',
                code:200
            }
        }
    };

    //对评论进行删除
    async remove(ctx,next){
        const {momentId} = ctx.params;
        const result = await removeMoment(momentId);
        if(result){
            ctx.body = {
                message:'删除成功',
                code:200
            }
        }
    }

    //给动态添加标签
    async add(ctx,next){

        const {momentId} = ctx.params;
        for(let item of ctx.label){
            await addLabel(item.id,momentId)
        }

        // 添加到数据库中
        ctx.body = {
            message:'添加标签成功',
            code:200
        }
    }
    async queryPicture(ctx,next){
        const {picPath} = ctx.params;
        const {type} = ctx.query;
        console.log(picPath)
        //进行数据库查询
        const result = await queryPictureMessage(picPath);
        const arr = ['large','middle','small'];
        let filePath = './upload/picture/'+picPath;
        if(arr.some(item=>item==type)){
            filePath = filePath +'-'+type
        }
        console.log(filePath);
        ctx.response.set('content-type',result[0].mimetype);
        ctx.body =  fs.createReadStream(filePath);
    }
 }

 module.exports = new Moment();