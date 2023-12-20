const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

// login route with jwt token
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' })
        res.status(200).json({ token });
        // save token in local storage
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
}

// signup route
const registerUser = async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be atleast 6 characters long' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        await user.save().then(() => {
            res.status(201).json({ message: 'Account successfully created' })
        }).catch
            (err => {
                console.log(err);
            }
            );


    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
}

// 

router.post('/login', loginUser)
router.post('/register', registerUser)


module.exports = router