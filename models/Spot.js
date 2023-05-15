const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spotSchema = new Schema({
  nom: { type: String, required: true },
  ville: { type: String, required: true },
  pays: { type: String, required: true },
  GPS: { type: String, required: false },
  avis: [{ type: Schema.Types.ObjectId, ref: 'AvisSpot' }],
  noteMoyenne: { type: Number, required: false },
});


spotSchema.virtual("url").get(function () {
  return "/Spot/" + this._id;
});

module.exports = mongoose.model('Spot', spotSchema);