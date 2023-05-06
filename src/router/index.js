const path = require('path');
const fs = require('fs');
// const 

function newRouter(app){
    const pathList =  path.resolve(__dirname);
    fs.readdir(pathList,(error,result)=>{
        if(error)return;
        result.forEach(item=>{
            console.log(item,'ddd');
            if(item == 'index.js')return;
            const router =  require(`./${item}`);
            app.use(router.routes());
            app.use(router.allowedMethods())
        });
    })
}




// pathList.foreach(item=>{
//     console.log(item)
// })
module.exports = {
    newRouter
}