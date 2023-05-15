const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const avisSpotSchema = new Schema({
  spotId: { type: Schema.Types.ObjectId, ref: "Spot", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  noteLieu: { type: Number, required: true },
  //noteDensitePop: { type: Number, required: true },
  commentaire: { type: String, required: true }, //String long
});

avisSpotSchema.virtual("url").get(function () {
  return "/avisSpot/" + this._id;
});

module.exports = mongoose.model('AvisSpot', avisSpotSchema);