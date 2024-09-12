const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    serialNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    component: {
      type: String,
      required: true,
      enum: ['C1', 'C2', 'C3', 'C4', 'C5'] 
    },
    name: {
      type: String,
      required: true,
    },
    partNumber: {
      type: String,
      required: true,
    },
    dateReceived: {
      type: String,
      required: true,
    },
    numberReceived: {
      type: Number,
      required: true,
    },
    dateDispatched: {
      type: String,
    },
    numberDispatched: {
      type: Number,
      default: 0,
    },
    balanceItems: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      // required: true,
      default:false
    },
    qrCode: {
      type: String,
      // required: true,
    },
  }, { timestamps: true });
  
 
  
  module.exports =  mongoose.model('Item', itemSchema);