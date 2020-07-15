const Item = require('../models/items');

const getItems = async (req, res) => {
  try {
    await Item.find()
      .sort({ date: -1 })
      .then((items) => res.json(items));
  } catch (error) {
    console.log(error);
    res.send('Items not found');
  }
};

const addItem = async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name
    });
    newItem.save().then((item) => res.json(item));
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    Item.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ message: 'Item deleted successfully' })))
      .catch((err) => res.status(404).json({ message: 'Cannot delete' }));
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { getItems, addItem, deleteItem };
