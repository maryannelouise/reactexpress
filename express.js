import express from "express";

import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors())

app.get("/getinfo", async (req, res) => {
  res.json({ FirstName: "Mary Anne Louise", Course: "BSIT", Motto: "Life Goes On" })
});

app.get("/getinfo2", async (req, res) => {
  res.json({ Age: "22", YearLevel: "3rd Year", School: "Lorma Colleges" })
});

app.get("/getinfo3", async (req, res) => {
  res.json({ Hobbies: "Watching and Playing Games" })
});

app.get("/getinfo4", async (req, res) => {
  res.json({ Birthday: "February 20, 2004" })
});

app.get("/getinfo5", async (req, res) => {
  res.json({ Favorite_Food: "Chicken Curry, Sisig, Sinigang, Bings, Fried Chicken, Adobong Sitaw, Sweet and Sour, Kimchi, Siomai, Siopao, Ice Cream, Shawarma, Empanada, Tiktok, Buchi" })
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});