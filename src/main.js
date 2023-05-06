const app = require('./app/index.js');

const port = require('./app/config');
require('./app/database.js');
app.listen(port.APP_PORT,function(){
    console.log('开始监听了');
});

