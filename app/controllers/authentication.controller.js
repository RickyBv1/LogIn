import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const users = [{
    user: "exampleA",
    email: "a@example.com",
    password: "$2b$06$hDgdpRKPoz2K894gPXQKue2cHjp6CEn5mUCpDljOPgKWRpyv.sLCS"
}]

async function login(req, res){
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status: "Error", message: "the information on the fields are incorrect"});
    }
    const userCheck = users.find(user => user.user === user);
    if (!userCheck){
        return res.status(400).send({status: "Error", message: "Error"})
    }
    const correctLogin = await bcryptjs.compare(password, userCheck.password);
    if (!correctLogin) {
        return res.status(400).send({status: "Error", message: "Error"})
    }
    const token = jsonwebtoken.sign(
        {user: userCheck.user},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION});
    
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    }
    res.cookie("jwt", token, cookieOption);
    res.send({status: "ok", message: "User logged in", redirect: "/admin"})
}

async function register(req, res){
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
        return res.status(400).send({status: "Error", message: "the information on the fields are incorrect"});
    }
    const userCheck = users.find(user => user.user === user);
    if (userCheck){
        return res.status(400).send({status: "Error", message: "there is already an account with this user name"})
    }
    const salt = await bcryptjs.genSalt(6);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = {
        user, email, password: hashPassword
    }
    users.push(newUser);
    return res.status(201).send({status: "OK", message: `User ${newUser.user} added`, redirect: "/"})
}

export const methods = {
    login,
    register,
}