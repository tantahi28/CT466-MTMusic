require('dotenv/config');
const ApiError = require('../api-error');
const supertokens = require("supertokens-node");
const UserMetadata = require("supertokens-node/recipe/usermetadata");
const UserRoles = require("supertokens-node/recipe/userroles");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");

class UserController {
    //GET
    async findOne(req, res, next) {
        try {
            // session
            const session = req.session;
            // get info from session
            const userId = session.getUserId(); // user id

            let jwt = session.getAccessToken();

            let userInfo = await supertokens.getUser(userId);

            if (userInfo === undefined) {
                return next(
                    new ApiError(500, "Should nerver come here!")
                );
            }

            const { metadata } = await UserMetadata.getUserMetadata(userId);
            const { roles } = await UserRoles.getRolesForUser("public", userId);
            const permissions = roles==[] ?  await UserRoles.getPermissionsForRole(roles) : [];

            // console.log(userInfo.emails[0]);

            // Add metadata, role, and permission fields to userInfo
            userInfo.metadata = metadata;
            userInfo.role = roles;
            userInfo.permissions = permissions;
            userInfo.token = jwt;
            

            res.status(200).json({ 
                userInfo: userInfo,
                message: 'User information retrieved successfully' 
            });
        } catch (error) {
            console.error(error);
            return next(
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    //PUT
    async edit(req, res, next) {
        try {
            const session = req.session;
            const userId = session.getUserId();

            let oldPassword = req.body.oldPassword
            let updatedPassword = req.body.newPassword
            let userInfo = await supertokens.getUser(userId);

            if (userInfo === undefined) {
                await supertokens.revokeAllSessionsForUser(userId);
                throw new ApiError(401, "Should nerver come here!");
            }
            
            // Check if request body is empty
            if (Object.keys(req.body).length === 0) {
                throw new ApiError(400, "Data to update can not be empty");
            }
            
            const email = userInfo.emails[0];

            // call signin to check that input password is correct
            let isPasswordValid = await ThirdPartyEmailPassword.emailPasswordSignIn(session.getTenantId(), email, oldPassword);
            if (isPasswordValid.status !== "OK") {
                throw new ApiError(401, "Invalid password!");
                return ;
            }
        
        
            // update the user's password using updateEmailOrPassword
            let response = await ThirdPartyEmailPassword.updateEmailOrPassword({
                recipeUserId: session.getRecipeUserId(),
                password: updatedPassword,
                tenantIdForPasswordPolicy: session.getTenantId()
            })

    
            const first_name = req.body.firstName;
            const last_name = req.body.lastName;
            
            // Update metadata, role, and permission using SuperTokens APIs
            await UserMetadata.updateUserMetadata(userId, { first_name: first_name, last_name: last_name });
    
            res.status(200).json({ 
                message: 'User information updated successfully' 
            });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }


}

module.exports = new UserController();
