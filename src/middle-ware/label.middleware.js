const {labelIsExist} = require('../service/label.service');
const {createLabel} = require('../service/label.service.js')
class LabelMiddle {
    //验证是否数据库中是否有该标签
   async verifyLabelIsExist(ctx,next){
        const {label} = ctx.request.body;
        const labelArr = [];
        //遍历
        for(let item of label){
            const result = await labelIsExist(item);
            const label = {};
            label.name = item;
            if(!result){
                const re = await createLabel(item);
                label.id = re.insertId
            }else{
                label.id = result.id
            }
            labelArr.push(label)
        }
        ctx.label = labelArr;
        await next();
    }
}
module.exports = new LabelMiddle();