const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./Models/Post.js')
const express = require('express')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
const path = require('path')

const salt = bcrypt.genSaltSync(10);

//settings
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'public')))
//settings

    //routes GET
    app.get('/', (req, res) =>{
      res.render('home')
    })

    app.get('/register', (req, res) =>{
        res.render('register')
    })
    //routes GET

    //routes POST
    app.post('/register', (req, res) =>{

        var erros = []
        var sucesso = []

        if(req.body.password != req.body.password2 || req.body.password == null || req.body.password == undefined){
            erros.push({text: 'Incorrect Password parameters!'})
        }

        if(erros.length > 0){
            res.render('register', {erros: erros})
        }
        else{
            const hash = bcrypt.hashSync(req.body.password, salt);

            Post.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
            }).then(() =>{
                sucesso.push({text: 'Account created successfully!'})
                if(sucesso.length > 0){
                    res.render('register', {sucesso: sucesso})
                }
            }).catch(() =>{
                res.send('<h1> Error for create user <h1/>')
            })
        }
    })
    //routes POST

    app.listen(PORT, () =>{
        console.log('Server is running')
    })