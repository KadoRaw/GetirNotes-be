const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NoteSchema = new Schema({
  condition: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
})

module.exports = mongoose.model("Notes", NoteSchema)
