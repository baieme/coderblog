const {
  createComment,
  replayComment,
  updateComment,
  removeComment,
  queryComment
} = require("../service/comment.serve");
class Comment {
  async create(ctx, next) {
    //获得评论的内容，id,
    //评论人的id

    const { content, momentId } = ctx.request.body;
    const { id } = ctx.body;
    // console.log()
    console.log(content);
    const result = await createComment(id, content, momentId);
    if (result) {
      ctx.body = {
        message: "评论成功了",
        code: 200,
        content,
        momentId,
        id,
      };
    }
  }
  //回复评论
  async replay(ctx, next) {
    //拿到 评论的id   评论的内容  和 用户的id

    const { content, momentId } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.body;

    //添加到数据库中
    const result = await replayComment(content, commentId, id, momentId);

    ctx.body = {
      message: "评论成功",
      code: 200,
      content,
      commentId,
      id,
    };
  }
  //修改评论
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    //进行数据修改
    const result = await updateComment(commentId, content);
    if (result) {
      ctx.body = {
        message: "修改评论成功",
        code: 200,
      };
    }
  }
  //删除评论
 async remove(ctx,next){
    //获得评论的id
    const {commentId} = ctx.params;
    const result = await removeComment(commentId);
    console.log(result)
    if(result){
        ctx.body = {
            message:'删除成功', 
            code:200
        }
    }
  }

  //查询评论
  async query(ctx,next){
    const {momentId} = ctx.request.body;
    const result = await queryComment(momentId);
    ctx.body = {
       message:"查询成功",
       code:200,
       list:result
    }
  }
}

module.exports = new Comment();
