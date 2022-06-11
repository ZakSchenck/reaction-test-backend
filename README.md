# Reaction Test Game (Server Side)
Live website: https://zakschenck.github.io/reaction-test <br>
Frontend code: https://github.com/ZakSchenck/reaction-test

## Tools Used
• HTML5 <br>
• Sass/SCSS <br>
• Javascript <br>
• Node.js <br>
• Express.js <br>
• PostgreSQL

## Backend Requests
GET request
```js
app.get("/api/v1/all", (req, res) => {
  db.query(
    // Limit of 10 leaderboard scores in ASCENDING order
    "SELECT * FROM public.leaderboard WHERE public.leaderboard.speed IS NOT NULL ORDER BY public.leaderboard.speed asc LIMIT 10",
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});
```
DELETE Request
```js
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
```
POST Request 
```js
app.post("/api/v1/all", (req, res) => {
  db.query(
    "INSERT INTO public.leaderboard (name, speed) VALUES ($1, $2) RETURNING *",
    [req.body.name, req.body.speed],
    (error, dbRes) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(200).json(dbRes.rows);
      }
    }
  );
});
```
