const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const fs = require('fs'); 
const resetPasswordOTP = require('../helpers/generateOTPResetPassword');
const UserModel  = require('../models/userModel');
const {hashedPassword, comparePassword, createToken} = require('../helpers/authHelper');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  },
});


// check registered user
const resetPasswordOTPController = async(req, res)=>{
    try {
     const {email, generateOTP} = req.body;
         
         const user = await UserModel.findOne({email}).select({password:0, profileImg:0});
         if (!user) {
           return res.send({
               success: false,
               message: 'Email is not registered'
           })
         }

        //  send otp
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "OTP for Reset Password",
            html: resetPasswordOTP(generateOTP)
          }
          
           const info = await transporter.sendMail(mailOptions);

          const userOtp = await UserModel.findOneAndUpdate({email}, {code:generateOTP}, {new:true}).select({profileImg:0, password:0});

           res.send({
            success:true,
            message: 'OTP has been sent to your email'
           })    

    } catch (error) {
     res.send("Error checking registered user");
     console.log(error);
    }
 }
 


 module.exports = {resetPasswordOTPController}