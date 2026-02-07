// Address Schema - This will be used as an EMBEDDED document
// Embedded documents are stored directly within the parent document
// Best for: One-to-one or one-to-few relationships, data that's always accessed together

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    default: "USA",
    trim: true
  }
}, {
  _id: false // No need for separate _id in embedded documents
});

module.exports = addressSchema;

