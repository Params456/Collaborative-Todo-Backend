var knex = require("../model")

module.exports = async(req,res)=>{
    const body = req.body;
    console.log(body)
    try {
      var find = await knex('cities').where('city_name',req.body.city_name).select()
      console.log(find)
      if (!find.length){
      console.log(body)
        await knex('cities').insert(body)
        const data = await knex('cities').where('city_name',req.body.city_name).select()
        res.json(data[0])
      }else{
        res.send({Err:`Oops city is already exists!!! city_id is ${find[0]['id']}`})
      }
    } catch (error) {
      res.send(error)  
    }
}