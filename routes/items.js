const express = require('express');
const router = express.Router();
const items = require('../controllers/items');

//@route GET api/items
//@desc GET Items
//@access Public
router.get('/', items.getItems);

//@route POST api/items
//@desc POST Item
//@access Public
router.post('/', items.addItem);

//@route DELETE api/items/:id
//@desc DELETE Item
//@access Public
router.delete('/:id', items.deleteItem);

module.exports = router;
