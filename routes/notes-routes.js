const express = require("express")

const router = express.Router()

const noteController = require("../controllers/note-controller")

router.delete("/:noteId", noteController.deleteNoteById)

router.get("/:noteId", noteController.getNoteById)

router.patch("/:noteId", noteController.updateNoteById)

router.post("/", noteController.createNote)

router.get("/", noteController.getAllNotes)
module.exports = router
