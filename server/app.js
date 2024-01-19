const Supertokens = require("supertokens-node");
const { middleware, errorHandler, SessionRequest } = require("supertokens-node/framework/express");
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const Dashboard = require("supertokens-node/recipe/dashboard");
const UserRoles = require("supertokens-node/recipe/userroles");
const UserMetadata = require("supertokens-node/recipe/usermetadata");
const { getSession } = require("supertokens-node/recipe/session");
// const getNewJWTPair = require('supertokens-node')
// const createNewSession = require('supertokens-node')



const path = require('path');
const express = require('express')
const logger = require('morgan')
const cors = require("cors");

const db = require('./config/db');
const route = require('./routes')


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

app.get('/', (req, res) => {
  res.send('Hello World!')
})


db.connect();
//Routes init
route(app);


app.get("/usermetadata", verifySession(), async (req, res) => {
    try {
        const session = await getSession(req, res);
        console.log("session:", session)
        const userId =session.getUserId();
        // const userId = 'd4fc9ed1-efe4-4aac-b405-70af274b9dc6'


        // Giả sử bạn có một phương thức getUserMetadata trong UserMetadata để lấy thông tin từ cơ sở dữ liệu
        const  metadata  = await UserMetadata.getUserMetadata(userId);

        // In thông tin ra console log
        console.log("User Metadata:", metadata);

        // Trả về dữ liệu cho người dùng, trong trường hợp này là JSON chứa thông tin metadata
        res.json(metadata);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Add this AFTER all your routes
app.use(errorHandler())


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})