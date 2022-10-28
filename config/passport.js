const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy: InstagramStrategy } = require('passport-instagram');
const refresh = require('passport-oauth2-refresh');
const passport = require('passport');
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const User = require("../models/User");
const sendUsertoSendy = require("../middleware/sendySub");
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');

// const LocalStrategy = require("passport-local").Strategy;
// const {strategy: GoogleStrategy } = require("passport-google-oauth");




//const { OAuthStrategy } = require('passport-oauth');

// const { Strategy: LocalStrategy } = require('passport-local');
// const { Strategy: FacebookStrategy } = require('passport-facebook');
// const { Strategy: TwitterStrategy } = require('passport-twitter');


/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */


 passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
User.findById(id, (err, user) => {
  done(err, user);
});
});

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );


// /**
//  * Sign in using Email and Password.
//  */
// passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//   User.findOne({ email: email.toLowerCase() }, (err, user) => {
//     if (err) { return done(err); }
//     if (!user) {
//       return done(null, false, { msg: `Email ${email} not found.` });
//     }
//     if (!user.password) {
//       return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
//     }
//     user.comparePassword(password, (err, isMatch) => {
//       if (err) { return done(err); }
//       if (isMatch) {
//         return done(null, user);
//       }
//       return done(null, false, { msg: 'Invalid email or password.' });
//     });
//   });
// }));

/**
 * Sign in with Google.
 */
// const googleStrategyConfig = new GoogleStrategy({
//   clientID: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: '/auth/google/callback',
//   passReqToCallback: true
// }, (req, accessToken, refreshToken, params, profile, done) => {
//   if (req.user) {
//     User.findOne({ google: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser && (existingUser.id !== req.user.id)) {
//         req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//         done(err);
//       } else {
//         User.findById(req.user.id, (err, user) => {
//           if (err) { return done(err); }
//           user.google = profile.id;
//           user.tokens.push({
//             kind: 'google',
//             accessToken,
//             accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
//             refreshToken,
//           });
//           user.profile.name = user.profile.name || profile.displayName;
//           user.profile.gender = user.profile.gender || profile._json.gender;
//           user.profile.picture = user.profile.picture || profile._json.picture;
//           user.save((err) => {
//             req.flash('info', { msg: 'Google account has been linked.' });
//             done(err, user);
//           });
//         });
//       }
//     });
//   } else {
//     User.findOne({ google: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//       User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
//         if (err) { return done(err); }
//         if (existingEmailUser) {
//           req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
//           done(err);
//         } else {
//           const user = new User();
//           user.email = profile.emails[0].value;
//           user.google = profile.id;
//           user.tokens.push({
//             kind: 'google',
//             accessToken,
//             accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
//             refreshToken,
//           });
//           user.profile.name = profile.displayName;
//           user.profile.gender = profile._json.gender;
//           user.profile.picture = profile._json.picture;
//           user.save((err) => {
//             done(err, user);
//           });
//         }
//       });
//     });
//   }
// });
// passport.use('google', googleStrategyConfig);
// refresh.use('google', googleStrategyConfig);


/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_ID,
  clientSecret: process.env.INSTAGRAM_SECRET,
  callbackURL: '/auth/instagram/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ instagram: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.instagram = profile.id;
          user.tokens.push({ kind: 'instagram', accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.data.profile_picture;
          user.profile.website = user.profile.website || profile._json.data.website;
          user.save((err) => {
            req.flash('info', { msg: 'Instagram account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ instagram: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      user.instagram = profile.id;
      user.tokens.push({ kind: 'instagram', accessToken });
      user.profile.name = profile.displayName;
      // Similar to Twitter API, assigns a temporary e-mail address
      // to get on with the registration process. It can be changed later
      // to a valid e-mail address in Profile Management.
      user.email = `${profile.username}@instagram.com`;
      user.profile.website = profile._json.data.website;
      user.profile.picture = profile._json.data.profile_picture;
      user.save((err) => {
        done(err, user);
      });
    });
  }
}));

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          loginID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ loginID: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);

            //Subcribing the user to a Mailing List using the Sendy API (self-hosted)
            //A Welcome email is sent to the user  followed by an email from the auto-responded (emails sent through AWS SES)

            sendUsertoSendy(profile.name.givenName, profile.emails[0].value);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });





