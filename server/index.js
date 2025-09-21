const express = require("express");
const Airtable = require("airtable");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

app.get("/api/projects", async (req, res) => {
  try {
    const records = await base(AIRTABLE_TABLE_NAME).select({}).all();
    res.json({ records });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { fields } = req.body;
    const record = await base(AIRTABLE_TABLE_NAME).create([{ fields }]);
    res.json(record);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.body;
    const record = await base(AIRTABLE_TABLE_NAME).update([{ id, fields }]);
    res.json(record);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
