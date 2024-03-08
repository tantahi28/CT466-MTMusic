const { verifySession } = require('supertokens-node/recipe/session/framework/express');

const songRouter = require ('./song');
const userRouter = require('./user')

function route(app) {
    app.use('/user', verifySession(), userRouter);
    app.use('/song', songRouter)
}

module.exports = route;