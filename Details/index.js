var deTails = require("./Details")
var knex = require("../model")
var deTails = new deTails();

var todo =  async function todo (body){
    try {
        var dict = {}
        var daTa = await knex('users').where('id',body.assignedTo)
        var li = await deTails.detail(daTa[0].email)
        delete li.age
        dict.text=body.text
        dict.assignedTo= li
        dict.dueDate = body.dueDate
        return dict
    }catch (error) {
        return error;
   }

}
exports.todo = todo;

exports.eachElement =  async function eachElement(array) {
    var list = [];
    for (var each of array){
        list.push(await todo(each))        
        return list
    
    }
}

