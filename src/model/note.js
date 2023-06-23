const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userid: { type: mongoose.Schema.Types.ObjectId, required: true },
  updateFlag: { type: Boolean, default: false },
  delFlag: { type: Boolean, default: false },
  oldDescription: { type: String },
  updatedDate: { type: Date },
});

noteSchema.pre("save", function (next) {
  if (this.updateFlag) {
    this.updatedDate = new Date();
  }
  next();
});

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
