const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user.model')
const router = Router()

require('dotenv').config();

// /api/auth/register
router.post(
    '/register', 
    [
      check('email', 'Incorrect email...').isEmail(),
      check('password', 'Incorrect password...')
      .isLength({min: 6 })  
    ],
    async (req, res) => {
try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data...'
        })
    }

    const {email, password} = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
       return res.status(400).json({ message: 'User is already exist...'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({message: 'User has been created...'})

}catch (e) {
    res.status(500).json({ message: 'Something goes wrong, try ones again...'})
}
})
// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'You have to input another email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password...').exists()
    ],
    async (req, res) => {
try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data...'
        })
    }

    const {email, password} = req.body
    
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({message: 'User does not exist...'})
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({message: 'Password is incorrect, try again...'})
    }

    const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        { expiresIn: '1h'}
    )

      res.json({ token, userId: user.id })

}catch (e) {
    res.status(500).json({ message: 'Something goes wrong, try ons again...'})
}
})

module.exports = router