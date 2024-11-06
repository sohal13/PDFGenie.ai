import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const route = express.Router();

route.get('/login/failed',(req,res)=>{
    res.status(401).json({
        success:false,
        message:"Google Login Failed"
    })
})

route.get('/login/success',(req,res)=>{
    if(req.user){
       // User data from Google is now available in `req.user`
       const user = req.user;

       // Optionally, you can generate a JWT token here
       const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET, { expiresIn: '90d' });

       // Send the user data and token as a JSON response to the frontend
       return res.status(200).json({
           success: true,
           message: "Successfully logged in",
           user: {
               username: user.username,
               email: user.email,
               profilePicture: user.profilePicture,
           },
           token: token,
       });
    }else{
        res.status(403).json({
            success:false,
            message:"Not Authorized"
        })
    }
})
route.get('/google/callback', passport.authenticate("google", { failureRedirect: '/login/failed' }), async (req, res) => {
    try {
        // User has been authenticated and `req.user` contains the user info
        if (!req.user) {
            return res.status(400).json({ success: false, message: "Authentication failed" });
        }

        // User data from Google is now available in `req.user`
        const user = req.user;

        // Optionally, you can generate a JWT token here
        const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET, { expiresIn: '90d' });

        // Send the user data and token as a JSON response to the frontend
       // Redirect to the frontend URL with token and user data
       return res.redirect(`${process.env.CLIENT_URL}auth/google/callback?token=${token}&user=${JSON.stringify(user)}`);
    } catch (error) {
        console.error("Error in /google/callback:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

route.get('/google',passport.authenticate("google",["profile","email"]));

route.get('logout',(req,res)=>{
    req.logout();
    res.redirect(passport.env.CLIENT_URL);
});

export default route;