import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport'
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
            scope:["profile","email"],
        },
        function (accessToken, refreshToken, profile, callback) {
            User.findOne({ googleId: profile.id }, async (err, existingUser) => {
                if (err) return callback(err);
                
                if (existingUser) {
                    return callback(null, existingUser);
                } 
                
                // If user does not exist, create a new user
                const newUser = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    fullName: profile.displayName,
                    profilePicture: profile.photos[0].value,
                    username: profile.displayName.replace(/\s+/g, '').toLowerCase(),  // Example of generating a username
                    isOAuthUser: true,
                });
        
                await newUser.save();
                return callback(null, newUser);
            });
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