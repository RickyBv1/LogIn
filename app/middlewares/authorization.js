import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "../controllers/authentication.controller.js";

dotenv.config();

function justAdmin(req, res, next) {
    const logged = checkForCookie(req);
    if (logged) return next();
    return res.redirect("/")
}

function justPublic(req, res, next) {
    const logged = checkForCookie(req);
    if (!logged) return next();
    return res.redirect("/admin")
}

function checkForCookie (req) {
    try{
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decrypted = jsonwebtoken.verify(cookieJWT, process.env.JTW_SECRET);
        const userCheck = users.find(user => user.user === decrypted.user);
        if (!userCheck){
            return false
        }
        return true;
    }
    catch {
        return false
    }
}

export const methods = {
    justAdmin,
    justPublic,
}