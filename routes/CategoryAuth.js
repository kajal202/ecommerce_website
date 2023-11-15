const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/CategoryModel");
const authenticate = require("../middleware/authenticate");
const slugify = require("slugify");
const isAdmin = require("../middleware/isAdmin");

 router.post("/create-category",authenticate,  isAdmin, async (req, res) => {
  const { name } = req.body;
  if (name) {
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category Already Exisits" });
    }

    const newCategory = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    if (newCategory) {
      return res.json({ success: "new category created", newCategory });
    } else {
      return res.status(500).json({ error: "Oops error in Category" });
    }
  } else {
    res.status(406).json({ error: "Name is required" });
  }
});

router.put("/update-category/:id",authenticate, isAdmin, async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (category) {
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } else {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
});

router.get("/get-category", async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Error while getting all categories",
    });
  }
});

router.get("/single-category/:slug", async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got Single Category Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
});

router.delete(
  "/delete-category/:id",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      await CategoryModel.findByIdAndDelete(id);
      res
        .status(200)
        .send({ success: true, message: "Categry Deleted Successfully" });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  }
);

module.exports = router;
