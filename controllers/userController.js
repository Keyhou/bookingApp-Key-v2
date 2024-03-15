const bcrypt = require("bcrypt");
const { User } = require("../db.js");
const isAdmin = require("../middlewares/isAdmin.middleware.js");

/* GET */
async function getAllUsers(req, res, next) {
	try {
		const users = await User.findAll();
		res.json({ users });
	} catch (error) {
		next(error);
	}
}

/* GET the user signed in rn */
async function getCurrentUser(req, res, next) {
	try {
		const userID = req.user.id;
		const currentUser = await User.findByPk(userID);

		if (!currentUser) {
			return res.status(400).json({ error: "User not found" });
		}

		res.status(200).json({ currentUser });
	} catch (error) {
		next(error);
	}
}

// GET all users with admin role
async function getAllAdminUsers(req, res, next) {
	try {
		const admin = await User.findAll({
			where: {
				role: "admin",
			},
		});
		res.status(200).json({ admin });
	} catch (error) {
		next(error);
	}
}

// /* GET One User */
// router.get("/me", async (req, res, next) => {
//   try {
//     // Get the user ID
//     const userId = req.user.id;

//     // Find the user by ID
//     const currentUser = await User.findByPk(userId);

//     // If the user is not found, send a 404 error
//     if (!currentUser) {
//       return res.status(404).json({ error: "user not found" });
//     }

//     // Return the user information
//     res.status(200).json({ currentUser });
//   } catch (error) {
//     // If there is an error, send the error message to the client
//     next(error);
//   }
// });

/* GET currentuser */
// router.get('/me', async (req, res, next) => {
//   try {
//     // Get the user ID
//     const userId = req.user.id;

//     // Find the user by ID
//     const currentUser = await User.findByPk(userId);

//     // If the user is not found, send a 404 error
//     if (!currentUser) {
//       return res.status(404).json({ error: 'user not found' });
//     }

//     // Return the user information
//     res.status(200).json({ currentUser });
//   } catch (error) {
//     // If there is an error, send the error message to the client
//     next(error);
//   }
// });

/* POST */
async function createUser(req, res, next) {
	const { role, firstName, lastName, email, phoneNumber, password } = req.body;

	// Check if the provided email is valid
	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: "Invalid email address" });
	}

	try {
		// Create the user if the email is valid
		const user = await User.create({
			role,
			firstName,
			lastName,
			email,
			phoneNumber,
			password,
		});

		res.json({ user });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the user." });
		next(error);
	}
}

/* PUT */
async function updateUser(req, res, next) {
	try {
		// Get the user ID from the URL
		const userId = req.params.userId;
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update user data with the information provided in the request body
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.email = req.body.email;
		user.phoneNumber = req.body.phoneNumber;

		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);

			user.password = hashedPassword;
		}

		await user.save();

		res.json({ message: "User updated", user });
	} catch (error) {
		// Handle any error that occurs using the update route
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while updating the user." });
		next(error);
	}
}

// PUT route for updating user details (accessible by the authenticated user)
async function updateUserDetails(req, res, next) {
	try {
		const { firstName, lastName, email, phoneNumber, password } = req.body;
		const user = await User.findOne({ where: { id: req.params.id } });

		if (!user) {
			return res
				.status(404)
				.json({ error: `User with id:${req.params.id} not found` });
		}

		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.phoneNumber = phoneNumber;

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		await user.save();
		res.json({ message: "User profile updated successfully" });
	} catch (error) {
		next(error);
	}
}

// PUT route for updating user's role, accessible by the admin
async function updateUserRole(req, res, next) {
	try {
		const { id } = req.params;
		const { role } = req.body;
		let user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: `User with id:${id} not found` });
		}

		// Update the user's role
		user.role = role;
		await user.save();
		res.json({ message: "User's role updated successfully" });
	} catch (error) {
		next(error);
	}
};

/* DELETE */
async function deleteUser(req, res, next) {
	try {
		// Get the user ID from the URL
		const userId = req.params.userId;
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.destroy();

		res.json({ message: "User deleted" });
	} catch (error) {
		// Handle any error that occurs using the delete route
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while deleting the user." });
		next(error);
	}
}

// /* DELETE */
// router.delete("/", async function (req, res, next) {
// 	const id = 2;
// 	const user = await User.findByPk(is);
// 	await user.destoy();
// 	res.json({ user });
// });

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getCurrentUser,
	getAllAdminUsers,
	updateUserDetails,
	updateUserRole,
};
