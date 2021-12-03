const { SignUp: SignUpService } = require('../services');

const signUp = async(req, res)=>{

    try{
        const {body} = req;
        const {doc} = await SignUpService.signUp(body);
        
        if(doc) {
            const {message, publicId} = doc;
            res.setHeader("message", message);
            res.setHeader("publicId", publicId);
            return res.status(201).json();           
        }          
        res.setHeader("message", "Registration failed");
        return res.status(404);
    } catch(err){
        return res.status(500).json(err);
    }  

};

module.exports = { signUp };