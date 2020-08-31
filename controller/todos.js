var knex = require("../model")
const moment = require("moment")
const joi = require("joi");
var impo = require("../Details/index").todo
var eachElement = require("../Details/index").eachElement
var todayDate = moment().format("YYYY-MM-DD")

moment.suppressDeprecationWarnings = true;

var create = async(req,res)=>{
    var body = req.body;
    if (body.dueDate == moment(body.dueDate).format('YYYY-MM-DD') && body.dueDate >= todayDate){
        const schema = joi.object().keys({
        text: joi.string().required(),
        assignedTo: joi.number().required(),
        dueDate : joi.date().required()
    })

    const data = schema.validate(body)
    if (data.error){
        res.send(data["error"]["details"])
    }else{
        body ['created_at'] = new Date();
        await knex('todos').insert(body)
        res.send(await impo(body))
        }
    }else{
        res.send("please check the format of dueDate")
    }

}

var single = async(req,res)=>{
    var header = req.headers
    var datas = await knex('users').where('email',header.email)
    if (datas.length){
        var todos = await knex('todos').select('text','dueDate').where('assignedTo',datas[0]['id'])
        res.send({todos:todos})  
    }else{
        res.send({Err : "Oops you are not user"})
    }
};

var getAll = async(req,res)=>{
    var list = [];
    var query = req.query;
    if (Object.keys(query).length){

        if (query.fromDueDate == moment(query.fromDueDate).format('YYYY-MM-DD') 
        && query.toDueDate == moment(query.toDueDate).format('YYYY-MM-DD')){

            if (query.fromDueDate && query.toDueDate){
                var date = await knex('todos').whereBetween('dueDate',[query.fromDueDate,query.toDueDate])
                res.send({json: await eachElement(date)})
            }
        }
        if (query.assignedTo ){

            if (query.assignedTo == 1){
                var assignedTo = await knex('todos').where('assignedTo',query.assignedTo)
                var notFine = await knex("todos")
                .where('assignedTo',assignedTo[0]['assignedTo'])
                 res.send({json: await eachElement(notFine)})

            }else{
                assignedTo = query['assignedTo'].split`,`.map(x=>+x)
                var notFine = await knex('todos').whereIn('assignedTo',assignedTo)
                res.send({json: await eachElement(notFine)})
            }

        }if (query.cityId){
            list2 = []
            var data = await knex('users').select('id').where('cityId',query.cityId)
            for (var id in data){
                list2.push(data[id]['id'])
            }
            var notFine = await knex('todos').whereIn('assignedTo',list2)
            res.send({json: await eachElement(notFine)})

        }
        
    }else{
        var todo = await knex('todos').select()
        for (var i of todo){
            list.push(await impo(i))
        }
        res.send(list)
    }
}

module.exports = {create,single,getAll}