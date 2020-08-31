const passwordHash = require("password-hash");
const knex = require("../model");

async function auth (req,res,next) {
    var header = req.headers
    var haV =await knex('users').where('email',header.email)
    if (haV.length){
        var hashedPassword = passwordHash.verify(header.password,haV[0]['password'])
        if (hashedPassword){
            res.status(200)
            next();
        }else{
            res.status(404).json({
                message:"You are not admin.."
            })
        }
    }else{
        res.status(404).json({
            message:"You are not admin.."
        })
    }
}

async function authPerson (req,res,next){
    var header = req.headers
    var haV =await knex('users').where('email',header.email)
    var userId = req.params.userId || haV[0].id
    if (haV.length){
        var hashedPassword = passwordHash.verify(header.password,haV[0]['password'])
        if (hashedPassword){
            if (haV[0]['id']==userId){
                res.status(200)
                next();
            }else{
                res.status(404).json({
                    message:"You are not admin..or There is no user with this id"
                })  
            }
        }else{
            res.status(404).json({
                message:"You are not admin..or password is wrong!!"
            })
        }
    }else{
        res.status(404).json({
            message:"You are not admin..or you are not user!!"
        })
    }
}

module.exports = {auth,authPerson}