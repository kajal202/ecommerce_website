const mongoose = require("mongoose");

const CateogrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  slug: {
    type: String,
    lowercase: true,
  },
});

const Category = mongoose.model("Category", CateogrySchema);
module.exports = Category;
