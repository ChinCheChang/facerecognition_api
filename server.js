const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'qzwx0310qzwx',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'Sally@gmail.com',
      password: 'Bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  // bcrypt.compare("bacon", hash, function(err, res) {
  //     // res == true
  // });

  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json({
          status: 'success',
          user : {
            id: database.users[0].id,
            name: database.users[0].name,
            email: database.users[0].email,
            entries: database.users[0].entries,
            joined: database.users[0].joined
          }
        });
      } else {
        res.status(400).json('error logging in');
      }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length){
        res.json(user[0]);
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error get user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  const found = database.users.filter(user => {
    if (user.id === id) user.entries++;
    return user.id === id;
  })
  found.length ? res.json(found[0].entries) : res.status(404).json('no such user');
})

app.listen(3001, () => {
  console.log('app is running on port 3001');
});



// Load hash from your password DB.
