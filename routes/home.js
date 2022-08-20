const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
// router.get("/", homeController.getIndex);
// router.get("/profile", ensureAuth, postsController.getProfile);
// router.get("/feed", ensureAuth, postsController.getFeed);
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);


router.get('/', homeController.getHome)
router.get('/profile', ensureAuth, homeController.getProfile)
router.get('/editButton', ensureAuth, homeController.editProfileButton)
router.post('/editProfile/:id', upload.single('image'), ensureAuth, homeController.editProfile)
router.post('/editProfilePicture', ensureAuth, homeController.editProfilePicture)

router.get('/message',  homeController.message)
router.post('/sendmessage',  homeController.sendmessage)
router.get('/messageSentSuccessfully',  homeController.messageSentSuccessfully)
// router.post('/subscribe',  homeController.subscribe)

// router.get('/mothersday', ensureAuth, homeController.mothersday)
// router.get('/mothersdayfailure', ensureAuth, homeController.mothersdayfailure)
// router.get('/mothersdaysuccess', ensureAuth, homeController.mothersdaysuccess)

// router.post('/create-checkout-session', ensureAuth, homeController.createcheckoutsession)


router.get('/features', homeController.features)

// router.get('/loggedinindex', ensureAuth, homeController.getHomeLoggedIn)
// router.get('/updatedindex', ensureAuth, homeController.updatedindex)
router.get('/login',  homeController.login)
router.get('/about',  homeController.about)
router.get('/termsofuse',  homeController.termsofuse)
router.get('/privacypolicy',  homeController.privacypolicy)
router.get('/error/404',  homeController.error404)
router.get('/error/500',  homeController.error500)

module.exports = router;
