const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('hello from home!');
})

app.get('/about', (req,res) => {
    res.send('here we goo');
})

app.get('/contact', (req,res) => {
    res.send('contact with us');
})

const users = [
    {id: 1, name: 'Araf'},
    {id: 2, name: 'Toqi'},
    {id: 2, name: 'Tahmid'},
]

app.get('/users', (req,res) => {
    res.send(users);
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})