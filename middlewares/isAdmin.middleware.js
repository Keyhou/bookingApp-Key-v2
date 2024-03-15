const isAdmin = (req, res, next) => {
	console.log("User:", req.user);
	if (req.user && req.user.role === "admin") {
		next(); // user is admin, allow access
	} else {
		res.status(403).json({
			message: "Access restricted to admins",
		});
	}
};

module.exports = isAdmin;
