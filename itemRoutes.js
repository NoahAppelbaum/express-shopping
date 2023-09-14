const express = require("express");
const { items } = require("./fakeDb");
const router = new express.Router();

const { NotFoundError, BadRequestError } = require("./expressError");

const ITEM_MODEL = { name: 'example', price: 'example' };


router.get("/", function (req, res) {
  return res.json({ items });
});


router.post("/", function (req, res) {

  for (const key in req.body) {
    if (!(key in ITEM_MODEL)) {
      throw new BadRequestError("Invalid JSON sent.");
    }
  }

  const newItem = req.body;



  items.push(newItem);
  return res.status(201).json({ added: newItem });
});


router.get("/:name", function (req, res) {
  if (!req.params.name) throw new BadRequestError();

  const item = items.find(item => item.name === req.params.name);

  if (!item) throw new NotFoundError("Item doesn't exist.");

  return res.json(item);
});


router.patch("/:name", function (req, res) {
  for (const key in req.body) {
    if (!(key in ITEM_MODEL)) {
      throw new BadRequestError();
    }
  }

  const updatedInfo = req.body;
  const itemIndex = items.findIndex(item => item.name === req.params.name);

  if (itemIndex === -1) throw new NotFoundError("Item doesn't exist.");

  const item = items[itemIndex];

  for (const key in updatedInfo) {
    item[key] = updatedInfo[key];
  }

  return res.json({ updated: item });
});


router.delete("/:name", function (req, res) {
  if (!req.params.name) throw new BadRequestError();

  const itemIndex = items.findIndex(item => item.name === req.params.name);

  if (itemIndex === -1) throw new NotFoundError("Item doesn't exist.");

  items.splice(itemIndex, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
