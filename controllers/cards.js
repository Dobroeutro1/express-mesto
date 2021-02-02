const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const addCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // _id станет доступен
  Card.create(owner, { name, link }, { new: true, runValidators: true })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Такой карточки не существует' });
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Передан не валидный id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Такой карточки не существует' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Такой карточки не существует' });
      }
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
