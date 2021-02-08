const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }));
};

const getUsersId = (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан не валидный id' });
      }
      res.status(500).send({ message: 'Нет пользователя с таким id' });
    });
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверно введена ссылка на изображение' });
      }
      res.status(500).send({ message: 'Произошла ошибка при отправке данных' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверно введена ссылка на изображение' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан не валидный id' });
      }
      res.status(500).send({ message: 'Произошла ошибка при отправке данных' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверно введена ссылка на изображение' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан не валидный id' });
      }
      res.status(500).send({ message: 'Произошла ошибка при отправке данных' });
    });
};

module.exports = {
  getUsers,
  getUsersId,
  addUser,
  updateProfile,
  updateAvatar,
};
