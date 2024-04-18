import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    const {fullname, email, username, password, role } = req.body

    console.log("Signup", fullname, email, username, password);

    if([fullname, email, username, password].some((field) => !field || field.trim() === "")) {
        return res.status(404).json({ message: 'All fields are required.' });
    }

    const existedUser = await User.findOne({ username });

    if(existedUser) {
        console.log("User Exist", existedUser);
        return res.status(404).json({ message: 'User with username already exists.' });
    }
    
    const newUser = await User.create({
        fullname,
        email,
        password,
        role,
        username: username.toLowerCase()
    });
        
    if (!newUser) {
        return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    return res.status(201).json({
        statusCode: 200,
        user: newUser,
        message: "User is created."
    });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    console.log("Login",username, password);

    if(!username) {
        return res.status(404).json({ message: 'Username is required!' });
    }
    
    const user = await User.findOne({ username });

    console.log(user);
    
    if(!user) {
        return res.status(404).json({ message: 'User does not exists!' });
    }
    
    const isValidPassword = await user.isPasswordCorrect(password);

    console.log("Password Validation", isValidPassword);
    
    if(!isValidPassword) {
        return res.status(404).json({ message: "Invalid user credentials." });
    }

    const accessToken = user.generateToken();

    console.log(accessToken);

    const options = { 
        httpOnly: true,
        secure: true
     };

    return res.status(200).cookie('accessToken', accessToken, options).json({
        statusCode: 200,
        user,
        message: "User is matched."
    });
}

const logoutUser = () => {
    console.log(res.cookie.accessToken);
    res.clearCookie('accessToken');
    return res.status(200).json({ message: "User logged out successfully." });
}

const currentUser = async (req, res) => {
    res.statusCode(200).json({message: "User Exist", user: req.user});
}

export {
    registerUser,
    loginUser,
    logoutUser,
    currentUser
}