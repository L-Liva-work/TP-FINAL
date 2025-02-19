
const jwt = require('jsonwebtoken')

const verifyToken = async (req , res, next ) =>{
    const token = req.headers['token']
    console.log(token)
    if (token) {
        jwt.verify(token, "extra-secreto", (error, data)=>{
            if(error){
                return res.status(400).json('Token invalido')
            } else {
                req.person = data
                next()
            }
        })
    }else {
        res.status(400).json('Enviar un token valido')
    }
}


module.exports=verifyToken