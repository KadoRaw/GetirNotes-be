const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
// Routes
const notesRoutes = require("./routes/notes-routes")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const HttpError = require("./models/http-error")

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use("/api/notes", notesRoutes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!" })
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@getirapp.miohsqc.mongodb.net/Notes?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB Connected")

    const port = process.env.PORT || 7333

    app.listen(port)
  })
  .catch((err) => {
    console.log("Could not connect to database", err)
  })
