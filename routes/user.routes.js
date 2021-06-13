const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/verifyToken')

// GET A SPECIFIC USER
router.get(
  '/:id',
  /**/ async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json(user)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
  }
)


//A user wants to like a classified
router.put('/:classId/:userId', auth, async (req, res) => {
  try {
    await User.findById(req.params.userId).then(user => {
      let block = false
      for (let i = 0; i < user.saved.length; i++) {
        if (req.params.classId == user.saved[i]) {
          block = true
        }      
      }
      if (!block) {
        user.saved.push(req.params.classId)
      }
      user.save()
      res.json({message:"Saved"})
      })
  } catch (error) {
    res.json({message:"Something went wrong"})
    console.log(error)
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    await User.findById(req.params.userId).then(user => {
     user.name = req.body.name
     user.surname = req.body.surname
     user.phone = req.body.surname
      user.save()
      res.json({message:"Updated"})
      })
  } catch (error) {
    res.json({message:"Something went wrong"})
    console.log(error)
  }
})

// DELETE FROM "SAVES"
router.delete('/:classId/:userId',auth, async (req, res) => {
  try {
    var saves = []
    await User.findById(req.params.userId).then(user => {
      for (let i = 0; i < user.saved.length; i++) {
        if (req.params.classId != user.saved[i]) {
          saves.push(user.saved[i])
        }      
      }
      })
      await User.findByIdAndUpdate(req.params.userId, {saved: saves})
      res.json({message:"Removed"})
  } catch (error) {
    res.json({message:"Something went wrong"})
    console.log(error)
  }
})

module.exports = router
