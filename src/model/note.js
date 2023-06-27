const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    oldTitle: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    updateFlag: {
        type: Boolean,
        default: false
    },
    delFlag: {
        type: Boolean,
        default: false
    },
    delDate: {
        type: Date
    },
    oldDescription: {
        type: String
    },
    updatedDate: {
        type: Date
    }

});

noteSchema.pre("save", function (next) {
    if (this.updateFlag) {
        this.updatedDate = new Date();
    }
    next();
});

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
