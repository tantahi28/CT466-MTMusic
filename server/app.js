const Supertokens = require("supertokens-node");
const { middleware, errorHandler, SessionRequest } = require("supertokens-node/framework/express");
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const { SuperTokensConfig } = require("./config/sptconfig");
// const getNewJWTPair = require('supertokens-node')
// const createNewSession = require('supertokens-node')



const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require("cors");

const db = require('./config/db');
const route = require('./routes');
const ApiError = require("./app/api-error")


//Environment variables
require('dotenv').config();

const app = express()
const port =  process.env.PORT || 3001

//// Initialize SuperTokens
Supertokens.init(SuperTokensConfig);

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...Supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));


// IMPORTANT: CORS should be before the below line.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
app.get("/tenants", async (req, res) => {
    let tenants = await Multitenancy.listAllTenants();
    res.send(tenants);
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());

// app.use(methodOverride('_method'));

// static file
app.use(express.static(path.join(__dirname, '/public')))

// http logger
app.use(logger("tiny"));




db.connect();

//Routes init
route(app);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


// Add this AFTER all your routes
app.use(errorHandler())


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})