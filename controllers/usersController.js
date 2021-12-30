const { validationResult } = require("express-validator")
const path = require ('path')
const fs = require ('fs')
const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');
const usersFilePath = path.join(__dirname, '../database/users.json');

const usersControllers = {
    login:(req, res) => {res.render('users/login')},

    register:(req, res) => {res.render('users/register')},

    processRegister: (req, res) => {
        const resultvalidations = validationResult(req);
        const userList = users.all()
        const {userType, name, user, email, date, password} = req.body;
		const newUser = {}
		
        newUser.id = userList[userList.length - 1].id + 1;
		newUser.name = name;
		newUser.user = user;
		newUser.email = email;
		newUser.date = date;
		newUser.password = password;
		newUser.userType = userType;


		userList.push(newUser);

        // userList.create(newUser)

       


        if(!resultvalidations.isEmpty())
        {
            res.render('users/register',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })}
        else
        {
            const fileContents = JSON.stringify(userList, null, " ")
            fs.writeFileSync(usersFilePath, fileContents)
        }

            

        
        
       

        return res.redirect('../')
    }
}

module.exports= usersControllers