const songRouter = require ('./song');

function route(app) {
    app.use('/song', songRouter)
}

module.exports = route;