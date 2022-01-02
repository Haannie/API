import express, { Router } from "express";
//dependency for giving unique random id
import { v4 as uuidv4 } from "uuid";
uuidv4();
const router = express.Router();
import multer from "multer";

//mp3 length
import getMP3Duration from "get-mp3-duration";

//mp3 tags
import jsmediatags from "jsmediatags";

//const app = express();
let users = [];

//all routes in here are starting with users
router.get("/", (req, res) => {
  res.send(users);
});
router.post("/", (req, res) => {
  jsmediatags.read("./", {
    onSuccess: function (tag) {
      console.log(tag);
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
  const user = req.body;

  users.push({ ...user, id: uuidv4() });
  res.send(`User with the name ${user.userName} added to DB`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
  //res.send("The get ID Route");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);
  res.send(`User with id ${id} has been deleted`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { userName, song } = req.body;

  const user = users.find((user) => user.id === id);

  if (userName) user.userName = userName;
  if (song) user.songtName = songName;

  res.send(`User with id ${id} has been updated`);
});

export default router;
