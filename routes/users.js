const usersRouter = require('express').Router();
const path = require('path');
const readJson = require('../utils/readJson');

usersRouter.get('/', (req, res) => {
  readJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  readJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      const user = users.find((userElement) => userElement._id === id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = usersRouter;
