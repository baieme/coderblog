const multer = require('koa-multer');
const Jimp = require('jimp');
const path = require('path')
const upload = multer({
    dest:'./upload/avatar'
})

const uploadPicture = multer({
    dest:'./upload/picture'
})
const avatarHandler = upload.single('avatar');
const pictureHandler = uploadPicture.array('picture');
const  pictureResize = async (ctx,next)=>{
    const files = ctx.req.files;

    for(let item of files){
        const newPath = path.join(item.destination,item.filename);
        Jimp.read(newPath).then(img=>{
            img.resize(1280,Jimp.AUTO).write(`${newPath}-large`);
            img.resize(640,Jimp.AUTO).write(`${newPath}-middle`);
            img.resize(320,Jimp.AUTO).write(`${newPath}-small`);
        })
    }
    await next();
}
module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}