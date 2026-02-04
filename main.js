import express from "express";
import { config } from "dotenv";
import fs from "fs/promises";

config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const userfile = "./users.json";

async function readUsers() {
  const data = await fs.readFile(userfile, "utf-8");
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(userfile, JSON.stringify(users, null, 2));
}

app.post("/users", async (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "name va age majburiy" });
  }

  const users = await readUsers();

  const id = users.length ? users.at(-1).id + 1 : 1;

  const newUser = {
    id,
    name,
    age
  };

  users.push(newUser);
  await writeUsers(users);

  res.status(201).json(newUser);
});


app.get("/users", async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Topilmadi" });
  }

  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const users = await readUsers();
  const filtered = users.filter(u => u.id != req.params.id);

  if (users.length === filtered.length) {
    return res.status(404).json({ message: "Topilmadi" });
  }

  await writeUsers(filtered);
  res.json({ message: "Ochirildi" });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
