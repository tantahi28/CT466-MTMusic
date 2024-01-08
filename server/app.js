const Supertokens = require("supertokens-node");
const { middleware, errorHandler, SessionRequest } = require("supertokens-node/framework/express");
const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const Dashboard = require("supertokens-node/recipe/dashboard");
const UserRoles = require("supertokens-node/recipe/userroles");
const UserMetadata = require("supertokens-node/recipe/usermetadata");



const path = require('path');
const express = require('express')
const logger = require('morgan')
const cors = require("cors");


//Environment variables
require('dotenv').config();

const app = express()
const port =  process.env.PORT || 3001

//// Initialize SuperTokens
Supertokens.init({
    framework: "express",
    supertokens: {
        // connectionURI: "https://try.supertokens.com"
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "http://127.0.0.1:9000",
        // apiKey: "someKey"
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "MTMusic",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        // apiBasePath: "/auth",
        // websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [{
                config: {
                    thirdPartyId: "google",
                    clients: [{
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET
                        }]
                    }
                },
            ],
        }),
        Session.init(), // initializes session features
        Dashboard.init({
            admins: [
              "minhtan280202@gmail.com",
            ],
          }),
          UserRoles.init(),
          UserMetadata.init(),
    ]
});

app.use(cors({
    origin: "http://localhost:${port}",
    allowedHeaders: ["content-type", ...Supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));


// IMPORTANT: CORS should be before the below line.
app.use(middleware());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());

// app.use(methodOverride('_method'));

// static file
app.use(express.static(path.join(__dirname, '/public')))

// http logger
app.use(logger("tiny"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const db = require('./config/db');
db.connect();


// An example API that requires session verification
app.get("/sessioninfo", middleware(), async (req, res) => {
    let session = req.session;

    if (session) {
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getAccessTokenPayload(),
        });
    } else {
        res.status(404).send("Session not found");
    }
});

// Add this AFTER all your routes
app.use(errorHandler())


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})