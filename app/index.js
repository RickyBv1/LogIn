import express from "express";
import cookieParser from 'cookie-parser'
//fix for _dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Server running on port", app.get("port"));

//Config
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser())


//Routes
app.get("/", authorization.justPublic, (req, res) => res.sendFile(__dirname + "/pages/login.html"))
app.get("/register", authorization.justPublic, (req, res) => res.sendFile(__dirname + "/pages/register.html"))
app.get("/admin", authorization.justAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"))
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);