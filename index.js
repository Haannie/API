import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
//multer for file uploads
import multer from "multer";
//mp3 song length determine

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", userRoutes);

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./songs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("song"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () =>
  console.log(`server Running on port: http://localhost:${PORT}`)
);
