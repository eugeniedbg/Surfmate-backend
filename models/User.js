const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    pseudo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false }
});

userSchema.plugin(uniqueValidator);

userSchema.virtual("url").get(function () {
    return "/user/" + this._id;
  });

module.exports = mongoose.model('User', userSchema);