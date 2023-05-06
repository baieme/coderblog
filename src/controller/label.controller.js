const {createLabel,labelList} = require('../service/label.service.js')
class LabelController {
    async create(ctx,next){
        const {name} = ctx.request.body;
        //加入到数据库中
        const result = await createLabel(name);
        if(result){
            ctx.body={
                message:'标签创建成功了',
                code:200
            }
        }
    }
    //获得所有的标签
    async queryAll(ctx,next){
        //获得偏移量和数量
        const {offset,size} = ctx.query;
        console.log(offset,size)
        //进行数据库查询
        const result = await labelList(offset,size);
        ctx.body = result;
        await next();
    }
}
module.exports = new LabelController();