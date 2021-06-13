const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/verifyToken')

// /api/auth/register
router.post(
  '/register',
  [
    // Validation
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum 6 symbols').isLength({ min: 6 }),
    check('name', 'Enter your name').exists(),
    check('surname', 'Enter your surname').exists()
  ],
  async (req, res) => {
    try {
      // Validation result
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        })
      }

      // Requesting values from frontend
      const { email, password, name, surname, phone } = req.body

      // Checking existing user
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User already exists' })
      }

      // Hashing password and saving user
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword /*name, surname */,
        name,
        surname,
        phone
      })
      await user.save()

      res.status(201).json({ message: 'User is created' })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    // Validation
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      // Validation result
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        })
      }

      // Requesting values from frontend
      const { email, password } = req.body

      // Finding the user
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User is not found' })
      }

      // Checking hashed passwords
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Incorrect data' })
      }

      // Creating jwtToken and sending it
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'))
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
  }
)

module.exports = router
