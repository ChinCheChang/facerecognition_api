const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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

  bcrypt.hash(password, null, null, function(err, hash) {
    database.users.push({
        id: database.users.length,
        name: name,
        email: email,
        password: hash,
        entries: 0,
        joined: new Date()
    })
  });

  res.json({
    status: 'success',
    user: {
      id: database.users.length,
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
    }
  });
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const found = database.users.filter(user => {
    return user.id === id;
  })
  found.length ? res.json(found) : res.status(404).json('no such user');
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
