const { v1: uuidV1 } = require('uuid');
const { users: UsersModel } = require('../models');

const signUp = async (payload) => {
    const publicId = uuidV1(); 
    const {name, mobileNumber, email, password} = payload;
    await UsersModel.create({public_id: publicId, name, mobile_number: mobileNumber, email, password})

    return {doc : {message: 'Successfully Registered', publicId}}
};

module.exports = { signUp };
