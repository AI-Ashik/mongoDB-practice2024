const express = require("express");
const path = require("path");
const usersModel = require("./models/users");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const users = await usersModel.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  try {
    const { name, email, image } = req.body;
    await usersModel.create({
      name,
      image,
      email,
    });
    res.status(201).redirect("/read");
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await usersModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).redirect("/read");
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// server listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
