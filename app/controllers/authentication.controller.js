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
        res.status(400).send({status: "ERROR", message: "the information on the fields are incorrect"});
    }
    const userCheck = users.find(user => user.user === user);
    if (userCheck){
        res.status(400).send({status: "ERROR", message: "there is already an account with this user name"})
    }
    
}

export const methods = {
    login,
    register,
}