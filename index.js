import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;
const SHEETDB_URL = process.env.SHEETDB_URL;

app.get("/", async (req, res) => {
  const token = req.query.token;
  if (token !== API_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const { data } = await axios.get(SHEETDB_URL);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
