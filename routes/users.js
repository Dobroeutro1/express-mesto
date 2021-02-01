const usersRouter = require('express').Router();
const {
  getUsers, getUsersId, addUser, updateAvatar, updateProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUsersId);
usersRouter.post('/', addUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
