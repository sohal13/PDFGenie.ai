import express from "express";
import passport from "passport";

const route = express.Router();

route.get('/login/failed',(req,res)=>{
    res.status(401).json({
        success:false,
        message:"Google Login Failed"
    })
})

route.get('/login/success',(req,res)=>{
    if(req.user){
        console.log(req.user);
        
        res.status(200).json({
            success:true,
            message:"Succesfully LogedIn"
        })
    }else{
        res.status(403).json({
            success:false,
            message:"Not Authorized"
        })
    }
})
route.get('/google/callback',passport.authenticate("google",{
    successRedirect:process.env.CLIENT_URL,
    failureFlash:'/login/failed',
}))

route.get('/google',passport.authenticate("google",["profile","email"]));

route.get('logout',(req,res)=>{
    req.logout();
    res.redirect(passport.env.CLIENT_URL);
});

export default route;