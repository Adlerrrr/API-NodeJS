const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./config/routes')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


let db = [
    {'1' : {Nome: 'Cliente 1', idade:'20'}},
    {'2' : {Nome: 'Cliente 2', idade:'20'}},
    {'3' : {Nome: 'Cliente 3', idade:'20'}}
];

app.get('/', (req,res) =>{
    return res.json(db)
});

app.post('/add',(req,res) => {
    const body = req.body;

    if(!body)
        return res.status(400).end()
    
    db.push(body)
    return res.json(body)
})

app.delete('/:id', (req,res)=>{
    const id = req.params.id;

    let newDb = db.filter(item => {
        if(!item[id])
            return item
    })

    db = newDb;
    return res.send(newDb)
})




app.listen(21262, ()=> {
    console.log(`Express started at http://localhost:21262`);
})