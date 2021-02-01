const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(400).send({ message: 'Нет пользователя с таким id' }));
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
    .catch(() => res.status(400).send({ message: 'Нет пользователя с таким id' }));
};

const addUser = (req, res) => {
  const { body } = req;
  User.countDocuments({})
    .then((count) => User.create({ ...body, id: count }))
    .then((user) => res.send({ user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при отправке данных' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при отправке данных' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при отправке данных' }));
};

module.exports = {
  getUsers,
  getUsersId,
  addUser,
  updateProfile,
  updateAvatar,
};
