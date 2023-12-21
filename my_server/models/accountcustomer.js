// const AccountCustomer = mongoose.model('AccountCustomer', {
//     Name: String,
//     phonenumber: String,
//     Mail: String,
//     password: String
//   });

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountCustomer = new Schema({
  Name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  Mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('AccountCustomer', AccountCustomer);