const Note = require("../model/note");

const createNote = async (req, res) => {
  try {
    const { title, description, userid } = req.body;
    const note = new Note({
      title,
      description,
      userid,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Error creating a note", error });
  }
};

const getNoteUser = async (req, res) => {
  try {
    const userid = req.user._id.toString();
    const condition = req.params.condition;
    console.log(userid, condition);
    let notes = [];
    if (condition == "all") {
      notes = await Note.find({ userid, delFlag: false });
    } else if (condition == "updated") {
      notes = await Note.find({ userid, updateFlag: true });
    } else if (condition == "deleted") {
      notes = await Note.find({ userid, delFlag: true });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving notes" });
  }
};

const getNoteId = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the note" });
  }
};

const updateNoteId = async (req, res) => {
  try {
    const { description } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note.oldDescription = note.description;
    note.description = description;
    note.updateFlag = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error updating the note" });
  }
};
const delNoteId = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note.delDate = new Date();
    note.delFlag = true;
    await note.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the note" });
  }
};
const forceDeleteId = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the note" });
  }
};

const deleteOldNotes = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    console.log(sevenDaysAgo);
    const notesToDelete = await Note.find({
      delFlag: true,
      delDate: { $lt: sevenDaysAgo },
    });

    console.log(notesToDelete);

    const noteIdsToDelete = notesToDelete.map((note) => note._id);
    const validNoteIdsToDelete = noteIdsToDelete.filter(
      (id) => id instanceof mongoose.Types.ObjectId
    );
    const deletionResult = await Note.deleteMany({
      _id: {
        $in: validNoteIdsToDelete,
      },
    });

    console.log(
      `${deletionResult.deletedCount} notes have been permanently deleted.`
    );
  } catch (error) {
    console.error("Error deleting old notes:", error);
  }
};

module.exports = {
  createNote,
  delNoteId,
  deleteOldNotes,
  forceDeleteId,
  updateNoteId,
  getNoteId,
  getNoteUser,
};
