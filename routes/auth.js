const express = require('express')
const passport = require('passport')
const router = express.Router()
const homeController = require('../controllers/home')


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/feed')
  }
)

router.get('/auth/instagram', passport.authenticate('instagram', { scope: ['profile', 'email'] }));
 router.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
   res.redirect('/feed');
 });


router.get('/logout', async(req, res, next) => {
  req.logout(err => {
    err ?  next(err) : res.redirect('/')
  })
})


module.exports = router