
const jwt = require('jsonwebtoken')

const verifyToken = async (req , res, next ) =>{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(400).json({ error: 'No se envió el token' })
    }
    console.log('Authorization header recibido:', authHeader)
    const token = authHeader.split(' ')[1]
    console.log('Token extraido: '+token)
    if (token) {
        jwt.verify(token, "extra-secreto", (error, data)=>{
            if(error){
                return res.status(400).json('Token invalido')
            } else {
                //console.log('Token verificado', data)
                req.person = data
                next()
            }
        })
    }else {
        res.status(400).json('Enviar un token valido')
    }
}


module.exports=verifyToken