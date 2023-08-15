const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  offerPrice: {
    type: Number,
  },

  stock: {
    type: Number,
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
      isVisible: {
        type: Boolean,
        default: true
      },
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  isWishlisted : {
    type: Boolean,
    required: true,
    default: false,
  },

  isVisible: {
    type: Boolean,
    default: true
  }
  
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
