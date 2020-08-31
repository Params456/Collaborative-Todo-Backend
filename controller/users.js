var knex = require("../model")
const joi = require("joi");
const passwordHash = require("password-hash");
const validator = require("email-validator")
var deTails = require("../Details/Details");
var deTails = new deTails();

var create = async(req,res)=>{
    var body = req.body;

    const schema = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required(),
        name: joi.string().required(),
        age: joi.number().required(),
        cityId: joi.number().required()
    })

    const data = schema.validate(body)
    if (data.error){
        res.send(data["error"]["details"])
    }else{
        if (validator.validate(body.email)){
            const hashedPassword = await passwordHash.generate(body.password);
            body.password = hashedPassword;
            try {
                await knex("users").insert(body);
                var personData = await deTails.detail(body.email)
                res.send(personData)
            } catch (error) {   
                res.send(error)
            }
        }
    }
}

var getAll = async(req,res)=>{
    var list = [];
    var query = req.query;
    if (Object.keys(query).length){
        var ageMoreThan = query.ageMoreThan || 0;
        var ageLessThan = query.ageLessThan || 999;
        var cityId = query.cityId;
        if (cityId && ageMoreThan && ageLessThan){

            var all = await knex("users")
            .where('cityId',cityId)
            .andWhere('age','>=',ageMoreThan)
            .andWhere('age','<=',ageLessThan)  
            res.send({json:await (deTails.forLoop(all))})
            return;
        }
        if (cityId && ageMoreThan){

            var all = await knex("users")
            .where('cityId',cityId)
            .andWhere('age','>=',ageMoreThan)
            res.send({json:await (deTails.forLoop(all))})
            return;

        } if (cityId && ageLessThan){

            var all = await knex("users")
            .where('cityId',cityId)
            .andWhere('age','<=',ageLessThan)
            res.send({json:await (deTails.forLoop(all))})
            return;

        } if (ageLessThan && ageMoreThan){
            var all = await knex("users")
            .where('age','>=',ageMoreThan)
            .andWhere('age','<=',ageLessThan)            
            res.send({json:await (deTails.forLoop(all))})
            return;

        }if (cityId){

            var all = await knex("users")
            .where('cityId',cityId)            
            res.send({json:await (deTails.forLoop(all))})
            return

        } if (ageLessThan){
            var all = await knex("users").
            where('age','<=',ageLessThan)
            res.send({json:await (deTails.forLoop(all))})
            return;

        } if (ageMoreThan){
            console.log("1111")
            var all = await knex("users").
            where('age','>=',ageMoreThan)
            res.send({json:await (deTails.forLoop(all))})
            return;

        }

    }else{
        var all = await knex('users').select()
        res.send({json:await (deTails.forLoop(all))})
    }
}


var getById = async(req,res)=>{
    var body = await knex('users')
    .where('id',req.params.userId)
    var personData = await deTails.detail(body[0].email)
    res.send({user:personData})
}

module.exports = {create,getAll,getById}