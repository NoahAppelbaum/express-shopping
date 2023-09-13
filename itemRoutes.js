const express = require("express");
const {items} = require("./fakeDb");
const router = new express.Router();


router.get("/", function(req, res){
  return res.json({items});
})




router.post("/", function(req, res){
  //error handling?
  const newItem = req.body;
  items.push(newItem);
  return res.status(201).json({added: newItem});
})



router.get("/:name", function(req, res){
  const item = items.find(item => item.name === req.params.name);
  return res.json(item);
})


router.patch("/:name", function(req, res){
  const itemIndex = items.findIndex(item => item.name === req.params.name);
  const newItem = req.body;
  items[itemIndex] = newItem;

  return res.json({updated: newItem});
})


router.delete("/:name", function(req, res){
  const itemIndex = items.findIndex(item => item.name === req.params.name);
  items.splice(itemIndex, 1);

  return res.json({message: "Deleted"});
})

module.exports = router;
