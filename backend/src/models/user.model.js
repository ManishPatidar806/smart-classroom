import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required:[true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    role: {
        type: String,
        enum: ['Teacher', 'Student'], // Define the allowed roles
        required: true
    },
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    accessToken: {
        type: String,
        trim: true
    },
},
{
    timestamps: true,
});

userSchema.pre("save", async function(next) {  // if password changed then bcrypt it
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,1);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        }, process.env.JWT_SECRET_KEY
    )
}

export const User = mongoose.model("User", userSchema);