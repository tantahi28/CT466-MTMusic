const ApiError = require('../api-error');
const UserRoles = require("supertokens-node/recipe/userroles");
const { verifySession } = require('supertokens-node/recipe/session/framework/express');

async function isAdmin(req, res, next) {
    try {
        await verifySession()(req, res, async () => {
            try {
                if (!req.session) {
                    return next(new ApiError(401, 'Unauthorized'));
                }

                const userId = req.session.getUserId(); 
                const { roles } = await UserRoles.getRolesForUser("public", userId);

                if (roles.includes("Admin")) {
                    next();
                } else {
                    return next(new ApiError(403, 'Forbidden'));
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, 'Internal Server Error'));
            }
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'Internal Server Error'));
    }
}

module.exports = isAdmin;
