const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creneauSchema = new Schema({
  spotId: { type: Schema.Types.ObjectId, ref: "Spot", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
});

creneauSchema.virtual("url").get(function () {
  return "/creneau/" + this._id;
});

module.exports = mongoose.model('Creneau', creneauSchema);