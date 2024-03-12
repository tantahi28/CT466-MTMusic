const { verifySession } = require('supertokens-node/recipe/session/framework/express');

const songRouter = require ('./song');
const userRouter = require('./user');
const genreRouter = require("./genre");
const playlistRouter = require("./playlist");
const favouriteRouter = require("./favourite");
const albumRouter = require("./album");

function route(app) {
    app.use('/user', verifySession(), userRouter);
    app.use('/song', songRouter)
    app.use('/genre', genreRouter)
    app.use('/playlist', verifySession(), playlistRouter)
    app.use('/favourite', verifySession(), favouriteRouter)
    app.use('/album', albumRouter)
}

module.exports = route;