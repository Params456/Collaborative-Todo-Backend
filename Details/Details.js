var knex = require('../model')

class deTails {
    async detail (email){
        try {
            var dict = {}
            var find = await knex('users').where('email',email).select()
            var details = await knex.from('users')
            .select('city_name','cities.id','name','email','age')
            .innerJoin('cities','cityId', 'cities.id').where('email',email)
            dict['id'] = find[0]['id']
            dict['name'] = details[0]['name']
            dict['eMail'] = details[0]['email']
            dict['age'] = details[0]['age']
            dict['city'] = {'name':details[0]['city_name'],'id':details[0]['id']}
            return dict
        } 
        catch (error) {
            next(error)
        }
    }

    async forLoop(array){
        var list = [];
        for (var i in array){
            list.push(await this.detail(array[i]['email']))
        }
        return list;
    }
}

module.exports = deTails;