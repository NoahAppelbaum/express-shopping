"use strict";

const express = require("express");
const { items, ITEM_MODEL } = require("./fakeDb");
const router = new express.Router();

const { NotFoundError, BadRequestError } = require("./expressError");


/** GET /items: respond with JSON list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});


router.post("/", function (req, res) {

  if (!(req.body.name) || !(req.body.price)) {
    throw new BadRequestError("Invalid JSON sent.");
  }

  for (const key in req.body) {
    if (!(key in ITEM_MODEL)) {
      throw new BadRequestError("Invalid JSON sent.");
    }
  }

  const newItem = req.body;



  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

/** GET /items/:name: responds with JSON for particular item*/
router.get("/:name", function (req, res) {

  const item = items.find(item => item.name === req.params.name);

  if (!item) throw new NotFoundError("Item doesn't exist.");

  return res.json(item);
});


/** PATCH /items/:name: updates keys passed in request for specified item */
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


/** DELETE /items/:name: deletes item from the fakeDB */
router.delete("/:name", function (req, res) {

  const itemIndex = items.findIndex(item => item.name === req.params.name);

  if (itemIndex === -1) throw new NotFoundError("Item doesn't exist.");

  items.splice(itemIndex, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
