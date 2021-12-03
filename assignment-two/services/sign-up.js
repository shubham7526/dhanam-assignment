const { v1: uuidV1 } = require('uuid');
const nodemailer = require('nodemailer');
const { users: UsersModel } = require('../models');
const { emailCredential } = require("../config.json");

const { adminEmail, adminPassword } = emailCredential;

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});

const signUp = async (payload) => {
    const publicId = uuidV1(); 
    const {name, mobileNumber, email, password} = payload;
    await UsersModel.create({public_id: publicId, name, mobile_number: mobileNumber, email, password})

    let mailDetails = {
        from: adminEmail,
        to: email,
        subject: 'Welcome',
        text: 'Hi, Welcome to Dhavan'
    };
  
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        console.log(data)
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
            return {doc : {message: 'Successfully Registered', publicId}}
        }
    });

};

module.exports = { signUp };
