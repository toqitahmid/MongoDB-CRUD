const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const users = [
    {id:1, name: 'Abu Sams Araf', email: 'abusamsaraf@gmail.com'},
    {id:2, name: 'Toqi Tahmid', email: 'toqithamid@gmail.com'},
    {id:3, name: 'Nobita Doremon', email: 'nobitadoremon@gmail.com'},
]

app.get('/',(req, res) => {
    res.send(users);
})

app.post('/', (req, res) => {
    console.log('Post method is working', req.body);

    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send( {success: true, massage:'post method is working'});
})

app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
})