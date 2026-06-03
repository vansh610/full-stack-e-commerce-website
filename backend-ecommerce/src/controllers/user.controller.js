import { User } from "../models/user.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";


// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    // CHECK EMPTY FIELDS
    if (!username || !email || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // CHECK USER EXISTS
    const existedUser = await User.findOne({
        email
    });

    if (existedUser) {

        return res.status(409).json({
            message: "User already exists"
        });
    }

    // CREATE USER
    const user = await User.create({
        username,
        email,
        password
    });

    // REMOVE PASSWORD FROM RESPONSE
    const createdUser = await User.findById(user._id)
        .select("-password");

    // RESPONSE
    return res.status(201).json({

        message: "User registered successfully",

        user: createdUser
    });
});


// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // CHECK EMPTY
    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password required"
        });
    }

    // FIND USER
    const user = await User.findOne({
        email
    });

    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });
    }

    // CHECK PASSWORD
    const isPasswordValid =
        await user.isPasswordCorrect(password);

    if (!isPasswordValid) {

        return res.status(401).json({
            message: "Invalid password"
        });
    }

    // GENERATE TOKEN
    const accessToken =
        user.generateAccessToken();

    // REMOVE PASSWORD
    const loggedInUser = await User.findById(user._id)
        .select("-password");

    // RESPONSE
    return res.status(200).json({

        message: "Login successful",

        accessToken,

        user: loggedInUser
    });
});

export {
    registerUser,
    loginUser
};