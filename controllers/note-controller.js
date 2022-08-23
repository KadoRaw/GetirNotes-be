const HttpError = require("../models/http-error")
const Note = require("../models/note")

const getNoteById = (req, res, next) => {
  const noteId = req.params.noteId

  let note
  try {
    note = Note.findById(noteId)
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a note",
      500
    )
    return next(err)
  }
  if (!note) {
    const err = new HttpError("Could not find a note for the provided id", 404)
    return next(err)
  }
  res.json(note.toObject({ getters: true }))
}

const deleteNoteById = async (req, res, next) => {
  const noteId = req.params.noteId

  let noteToDelete
  try {
    noteToDelete = await Note.findById(noteId)
  } catch (error) {
    const err = new HttpError("Server error", 500)
    return next(err)
  }
  if (!noteToDelete) {
    const err = new HttpError("Could not find note", 404)
    return next(err)
  }
  try {
    await noteToDelete.remove()
  } catch (error) {
    const err = new HttpError("Could not delete note", 500)
    return next(err)
  }
  res.status(200).json({ message: "Note deleted", noteId: noteId })
}

const getAllNotes = async (req, res, next) => {
  let notes
  try {
    notes = await Note.find()
  } catch (error) {
    const err = new HttpError("Could not get notes", 500)
    return next(err)
  }
  if (!notes || notes.length === 0) {
    const err = new HttpError("Could not find any notes", 404)
    return next(err)
  }

  res.json(notes.map((note) => note.toObject({ getters: true })))
}

const updateNoteById = async (req, res, next) => {
  const { title, content, condition } = req.body
  const noteId = req.params.noteId

  let noteToUpdate
  try {
    noteToUpdate = await Note.findById(noteId)
  } catch (error) {
    const err = new HttpError("Server error", 500)
    return next(err)
  }
  if (!noteToUpdate) {
    const err = new HttpError("Could not find note", 404)
    return next(err)
  }
  noteToUpdate.note = content
  noteToUpdate.title = title
  noteToUpdate.condition = condition
  try {
    await noteToUpdate.save()
  } catch (error) {
    const err = new HttpError("Could not update note", 500)
    return next(err)
  }
  res.status(200).json(noteToUpdate.toObject({ getters: true }))
}

const createNote = async (req, res, next) => {
  const { content, title, condition } = req.body

  const createdNote = new Note({
    content: content,
    title: title,
    condition: condition,
  })

  try {
    await createdNote.save()
  } catch (error) {
    const err = new HttpError("Could not create note", 500)
    return next(err)
  }
  res.status(201).json(createdNote.toObject({ getters: true }))
}

exports.getAllNotes = getAllNotes
exports.getNoteById = getNoteById
exports.deleteNoteById = deleteNoteById
exports.updateNoteById = updateNoteById
exports.createNote = createNote
