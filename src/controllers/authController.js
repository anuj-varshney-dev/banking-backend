import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
      const { name, email, password } = req.body; // inside bracket these are the JS vairiables built by me
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await prisma.users.findUnique({
    where: {
        email
    }
});
if (existingUser) {
    return res.status(400).json({
        message: "Email already exists"
    });
}
const user = await prisma.users.create({
    data: {
        name,
        email,
        password : hashedPassword  //here left side is prisma schema defined and right side is JS variable defined by me
    }
});
return res.status(201).json({
    message: "User registered successfully",
    user
});
};

export const loginUser = async (req, res) => {
       const { email, password } = req.body;
    const user= await prisma.users.findUnique({
    where: {
        email
    }
});
if(!user)
{
    return res.status(401).json({
        message: "Invalid email ",
    })
}
        const isMatch = await bcrypt.compare(
    password,
    user.password
);
if(!isMatch)
{
    return res.status(401).json({
        message : "Invalid email or password"
    });
}
const token = jwt.sign(
    {
            id: user.id,   //payload
    },
    process.env.JWT_SECRET, //secret key
    {
            expiresIn: "1h" //options
    }
);
return res.status(200).json({
    message: "Login successful",
    token : token
});
}

export const getProfile = async (req,res) => { //just for testing JWT 
     res.json(req.user);
}
