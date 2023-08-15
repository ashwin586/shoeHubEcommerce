const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },

  imageUrl: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  isAvailable: {
    type:Boolean,
    default: true,
  }
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;
