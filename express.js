import express from "express"
import cors from "cors"
import multer from "multer"

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({ dest: "uploads/" })

app.post("/form", upload.single("image"), (req, res) => {

    const imagePath = req.file.path

    res.json({
        message: "Image received",
        imagePath: imagePath,
        prediction: "Earlyblight",
        accuracy: "95%"
    })

})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})