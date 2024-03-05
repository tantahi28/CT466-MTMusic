const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const Session = require("supertokens-node/recipe/session");
const { TypeInput } = require("supertokens-node/types");
const Dashboard = require("supertokens-node/recipe/dashboard");
const UserRoles = require("supertokens-node/recipe/userroles");
const UserMetadata = require("supertokens-node/recipe/usermetadata");

function getApiDomain() {
    const apiPort = process.env.PORT || 3001;
    const apiUrl = `http://localhost:${apiPort}`;
    return apiUrl;
}

function getWebsiteDomain() {
    const websitePort = process.env.PORT || 3000;
    const websiteUrl = `http://localhost:${websitePort}`;
    return websiteUrl;
}

const SuperTokensConfig = {
    framework: "express",
    supertokens: {
        // this is the location of the SuperTokens core.
        connectionURI: "http://127.0.0.1:9000",
        // connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        appName: "MTMusic",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                clientSecret: "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",
                            },
                        ],
                    },
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
    ],
};

module.exports = { SuperTokensConfig, getApiDomain, getWebsiteDomain };
