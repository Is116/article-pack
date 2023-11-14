const socketIO = require('socket.io');
const Comment = require('../models/comment');

module.exports = (server) => {
    const io = new socketIO.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("message", (message) => {
            console.log("Received message: " + message);
            io.emit("message", message);
        });

        socket.on('joinArticleRoom', (articleId) => {
            socket.join(articleId);
            console.log(`User joined room for article ${articleId}`);
        });

        socket.on('comment', async (data) => {
            const { articleId, commentText, commentId, username } = data;

            try {
                if (commentId) {
                    const updatedComment = await Comment.findByIdAndUpdate(commentId, { comment: commentText }, { new: true });
                    if (updatedComment) {
                        io.to(articleId).emit('comment', updatedComment);
                    }
                } else {
                    const newComment = new Comment({ comment: commentText, username, articleId });
                    await newComment.save();
                    io.to(articleId).emit('comment', newComment);
                }
            } catch (error) {
                console.error('Error updating or adding comment:', error);
            }
        });

        socket.on('deleteComment', async (data) => {
            const { articleId, commentId } = data;

            try {
                const deletedComment = await Comment.findByIdAndDelete(commentId);

                if (deletedComment) {
                    io.to(articleId).emit('deleteComment', commentId);
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
