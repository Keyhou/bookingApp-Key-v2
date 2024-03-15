// const router = express.Router();
const jwt = require("jsonwebtoken");
// const { User } = require("../db.js");
// const isAdmin = require("./isAdmin.js");
// const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const SECRET_KEY = "secretkey23456";

// Middleware to authenticate the user using JWT
function authenticateUser(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ message: "No token provided." });
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).json({ message: "Invalid token" });
	}
}

module.exports = authenticateUser;