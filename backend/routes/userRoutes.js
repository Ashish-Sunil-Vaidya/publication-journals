const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()


// login with jwt token endpoint
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

        const match = await bcrypt.compare(password, user.password); 
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' })
        res.status(200).json({ token });
        // save token in local storage
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
}

// signup endpoint
const registerUser = async (req, res) => {
    const { email, password,confirmPassword } = req.body
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

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
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

// reset password endpoint
const resetPassword = async (req, res) => {
    const { email, password, confirmedPassword } = req.body;

    try {
        if (!email || !password || !confirmedPassword) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Requested EmailId not found' })
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return res.status(400).json({ message: 'New password cannot be same as old password' })
        }

        if (password !== confirmedPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({ message: 'Password successfully changed' })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
}

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/reset', resetPassword)


module.exports = router