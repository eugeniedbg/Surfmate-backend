const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  commentaire: { type: String, required: true }, //String long
  //img: { type: String, required: false },
});

publicationSchema.virtual("url").get(function () {
  return "/publication/" + this._id;
});

module.exports = mongoose.model('Publication', publicationSchema);