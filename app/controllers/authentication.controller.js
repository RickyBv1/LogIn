import bcryptjs from "bcryptjs";

const users = [{
    user: "Ricky",
    email: "rickycortes668668@gmail.com",
    password: "examplePassword123"
}]

async function login(req, res){

}

async function register(req, res){
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
        return res.status(400).send({status: "ERROR", message: "the information on the fields are incorrect"});
    }
    const userCheck = users.find(user => user.user === user);
    if (userCheck){
        return res.status(400).send({status: "ERROR", message: "there is already an account with this user name"})
    }
    const salt = await bcryptjs.genSalt(6);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = {
        user, email, password: hashPassword
    }
    users.push(newUser);
    return res.status(201).send({status: "OK", message: `User ${newUser.user} added`, redirect: "/"});

}

export const methods = {
    login,
    register,
}