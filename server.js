const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
//const loginRoutes = require("./routes/login")
const commentRoutes = require("./routes/comments");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport");

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, parameterLimit: 50000, limit: '50mb'}));

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_string }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
//app.use('login', loginRouter);
app.use("/comment", commentRoutes);

/**
 * OAuth authentication routes. (Sign in)
 */
 app.get('/auth/instagram', passport.authenticate('instagram', { scope: ['basic', 'public_content'] }));
 app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
   res.redirect(req.session.returnTo || '/');
 });
//  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
//  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//    res.redirect(req.session.returnTo || '/');
//  });
//  app.get('/auth/github', passport.authenticate('github'));
//  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//    res.redirect(req.session.returnTo || '/');
//  });
 app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets.readonly'], accessType: 'offline', prompt: 'consent' }));
 app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
   res.redirect(req.session.returnTo || '/');
 });
//  app.get('/auth/twitter', passport.authenticate('twitter'));
//  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
//    res.redirect(req.session.returnTo || '/');
//  });

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
