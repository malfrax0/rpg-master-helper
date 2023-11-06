import { Handler } from "express";
import { auth, claimCheck } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv"

dotenv.config()

export const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: process.env.TOKEN_SIGNING_ALG
})

const user = (): Handler => function(req, res, next) {
    const permissionCheck = claimCheck((payload) => {
        return true;
    });

    permissionCheck(req, res, next);
}

export default user;