import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport'
import dotenv from 'dotenv';
import User from '../schema/UserSchema.js';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
            scope:["profile","email"],
        },
        async function (accessToken, refreshToken, profile, callback) {
            try {
                // Use async/await to handle the promise returned by findOne
                const existingUser = await User.findOne({ googleId: profile.id });
        
                if (existingUser) {
                    // If user exists, return the user
                    return callback(null, existingUser);
                }
        
                // If user does not exist, create a new user
                const newUser = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    profilePicture: profile.photos[0].value,
                    username: profile.displayName.replace(/\s+/g, '').toLowerCase(), // Example of generating a username
                    isOAuthUser: true,
                });
        
                // Save the new user to the database
                await newUser.save();
                
                // Return the new user to the callback
                return callback(null, newUser);
            } catch (err) {
                // Handle any errors that might occur during the process
                return callback(err);
            }
        }
        
    )
);

passport.serializeUser((user,done)=>{
    done(null,user)
});

passport.deserializeUser((user,done)=>{
    done(null,user)
});

export default passport;