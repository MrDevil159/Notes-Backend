const express = require("express");
const router = express.Router();
const {
    createNote,
    delNoteId,
    deleteOldNotes,
    forceDeleteId,
    updateNoteId,
    getNoteId,
    getNoteUser
} = require("../controller/noteController");

router.post("/note/new", createNote);
router.delete("/note/:id", delNoteId);
router.delete("/noteDel", deleteOldNotes);
router.delete("/note/forceDelete/:id", forceDeleteId);
router.put("/note/:id", updateNoteId);
router.get("/note/:id", getNoteId);
router.get("/getNote/:condition", getNoteUser);

module.exports = router;
