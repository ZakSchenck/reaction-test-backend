require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
// Handles CORS policy
const cors = require("cors");
app.use(cors());
// Database connector
const db = require("./connection");

// Get all leaderboard rankings
app.get("/api/v1/all", (req, res) => {
  db.query(
    // Limit of 10 leaderboard scores in ASCENDING order
    "SELECT * FROM public.leaderboard ORDER BY public.leaderboard.score asc LIMIT 10 ",
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});

app.delete("/api/v1/all/:id", (req, res) => {
  db.query(
    "DELETE FROM public.leaderboard WHERE public.leaderboard.id = $1",
    [Number(req.params.id)],
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});

// POST new score
app.post("/api/v1/all", (req, res) => {
  db.query(
    "INSERT INTO public.leaderboard (name, score) VALUES ($1, $2) RETURNING *",
    [req.body.name, req.body.score],
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});

app.listen(process.env.PORT || 4001, console.log("connected"));
