const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  phoneNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isBlocked: {
    type: Boolean,
    required: true,
  },

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],

  address: [
    {
      name:{
        type:String,
        required: true
      }, 
      
      email:{
        type: String,
        required: true,
      }, 

      phoneNo: {
        type: Number,
        required: true,
      },

      streetAddress: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      pinCode: {
        type: Number,
        required: true
      },

      state: {
        type: String, 
        required: true
      }, 

      isSelected: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  ]
  
});


const User = mongoose.model("users", usersSchema);
module.exports = User;
